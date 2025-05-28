import {Component, signal} from '@angular/core';
import {estimateColor} from '../../helpers/color.helper';
import {generateUuid} from '../../helpers/attribute.helper';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'lg-color-palette',
  standalone: true,
  template: `
      <div class="lg-color-palette">
          @for (color of colors();track color) {
              <div class="lg-color-palette__color"
                   [ngStyle]="{backgroundColor: color}">
                   {{ color }}
              </div>
          }
      </div>
  `,
  styles: [`
    .lg-color-palette {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .lg-color-palette__color {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      border-radius: 4px;
    }
  `],
  imports: [
    NgStyle
  ]
})
export class ColorPaletteComponent {
  colors = signal(Array.from({length: 200}, (_, i) => estimateColor(generateUuid())))
}
