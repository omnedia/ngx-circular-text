import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'om-circular-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-circular-text.component.html',
  styleUrl: './ngx-circular-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCircularTextComponent implements AfterViewInit, OnDestroy {
  @ViewChild('OmCircularText', {static: true}) circleRef!: ElementRef<HTMLElement>;

  @Input('styleClass') styleClass?: string;

  @Input()
  set text(text: string) {
    this.letters.set(Array.from(text));
    this.getLetterStyles();
  }

  @Input()
  set spinDuration(duration: number) {
    this.spinDurationValue.set(duration);
  }

  private spinDurationValue = signal(20);

  @Input()
  set size(size: string) {
    this.style.update(prev => ({
      ...prev,
      '--om-circular-text-size': `${size}`
    }));

    this.getLetterStyles();
  }

  letters = signal<string[]>([]);
  letterStyles = signal<Record<string, string>[]>([]);

  private animId: number | null = null;
  private running = false;
  private angle = 0;
  private lastTimestamp = 0;
  private radius = 75;

  isInView = signal(false);
  private intersectionObserver?: IntersectionObserver;

  style = signal({});

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit() {
    this.angle = 0;
    this.lastTimestamp = performance.now();

    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        const wasInView = this.isInView();
        this.isInView.set(entry.isIntersecting);

        if (!wasInView && this.isInView()) {
          this.running = true;
          this.animate();
        }

        if (!this.isInView()) {
          this.running = false;
        }
      });

      this.intersectionObserver.observe(this.circleRef.nativeElement);
    }
  }

  ngOnDestroy() {
    this.running = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  animate = () => {
    if (!this.running) return;
    const now = performance.now();
    const elapsed = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;
    const dps = 360 / this.spinDurationValue();
    this.angle = (this.angle + dps * elapsed) % 360;
    this.circleRef.nativeElement.style.transform = `rotate(${this.angle}deg)`;
    this.animId = requestAnimationFrame(this.animate);
  };

  getLetterStyles(): void {
    const rect = this.circleRef.nativeElement.getBoundingClientRect();
    this.radius = rect.width / 2;

    const letterStyles: Record<string, string>[] = [];

    this.letters().forEach((letter, index) => {
      const angle = (360 / this.letters().length) * index - 90;

      const letterStyle = {
        transform: `
          rotate(${angle}deg)
          translateY(-${this.radius}px)
        `
      };

      letterStyles.push(letterStyle);
    });

    this.letterStyles.set(letterStyles);
  }
}
