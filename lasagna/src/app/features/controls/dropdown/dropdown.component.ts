import {Component, HostListener, signal} from '@angular/core';
import {ClickOutsideDirective} from '../../../shared/view/directives/click-outside.directive';

@Component({
  selector: 'lg-dropdown',
  standalone: true,
  template: `
    <div class="lg-dropdown"
         (lgClickOutside)="closeDropdown()"
         [class.lg-dropdown-open]="display()">
      <div class="lg-dropdown-anchor" (click)="toggleDropdown()">
        <ng-content select="[lgDropdownAnchor]"></ng-content>
      </div>

      <div class="lg-dropdown-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [
    ClickOutsideDirective
  ],
  styles: [`
    :host {
      display: block;
      position: relative;
      z-index: 2;
    }

    .lg-dropdown {
      position: relative;
      display: inline-block;
    }

    .lg-dropdown-content {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      border-radius: 16px;
      padding: 16px;
    }

    .lg-dropdown-open .lg-dropdown-content {
      display: block;
    }

    .lg-dropdown-item {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }

    .lg-dropdown-item:hover {
      background-color: #f1f1f1;
    }
  `]
})
export class DropdownComponent {
  constructor() {
  }

  display = signal(false);

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  toggleDropdown() {
    this.display.set(!this.display());
  }

  closeDropdown() {
    this.display.set(false);
  }
}
