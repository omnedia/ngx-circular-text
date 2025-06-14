# ngx-circular-text

<a href="https://ngxui.com" target="_blank" style="display: flex;gap: .5rem;align-items: center;cursor: pointer; padding: 0 0 0 0; height: fit-content;">
  <img src="https://ngxui.com/assets/img/ngxui-logo.png" style="width: 64px;height: 64px;">
</a>

This library is part of the NGXUI ecosystem.
View all available components at [https://ngxui.com](https://ngxui.com)

`@omnedia/ngx-circular-text` is an Angular library that provides a performant animated circular text component. It displays any text along a perfect circle and animates the text rotation natively, without dependencies on external animation libraries.

## Features

* Animated circular text ring, with smooth continuous rotation.
* Native CSS and JavaScript animation, no dependencies (no Framer Motion or GSAP needed).
* Highly configurable: control rotation speed, circle size, and text.
* Hover behaviors for speed up, slow down, pause, etc.
* Signal-based, standalone, Angular v20 compatible, SSR-safe.

## Installation

Install the library:

```
npm install @omnedia/ngx-circular-text
```

## Usage

Import the `NgxCircularTextComponent` in your Angular module or component:

```typescript
import { NgxCircularTextComponent } from '@omnedia/ngx-circular-text';

@Component({
  ...
  imports: [
    ...
    NgxCircularTextComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-circular-text
  [text]="'NGX*UI*COMPONENTS*'"
  [spinDuration]="20"
  [size]="'200px'"
  styleClass="custom-circular"
></om-circular-text>
```

## API

```html
<om-circular-text
  [text]="text"
  [spinDuration]="spinDuration"
  [size]="size"
  styleClass="your-custom-class"
></om-circular-text>
```

* `text` (required): The text content to display along the circle.
* `spinDuration` (optional): How many seconds for a full rotation. Default: `20`.
* `size` (optional): The diameter of the circular container (e.g., `'200px'`, `'10em'`, `'12rem'`). Default: `'150px'`.
* `styleClass` (optional): Additional CSS class for the container.

## Example

```html
<om-circular-text
  [text]="'HELLO*ANGULAR*WORLD*'"
  [spinDuration]="12"
  [size]="'220px'"
  styleClass="circular-demo"
></om-circular-text>
```

## Styling

Use `styleClass` to add custom styles for the text or container:

```css
.circular-demo {
  font-size: 2rem;
  color: #1565c0;
  font-weight: bold;
}
```

This will set the font size, color, and weight for all characters in the ring.

## Notes

* Font size is inherited from the parent/component CSS. Adjust it for different effects.
* Animations are native, so they run at full speed in any browser, no third-party dependencies.
* Component is SSR safe and uses Angular signals and standalone API.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

MIT
