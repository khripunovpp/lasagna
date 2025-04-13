import {Component, signal, viewChildren} from '@angular/core';
import {ButtonComponent} from './button.component';
import {GapRowComponent} from './gap-row.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lg-header',
  standalone: true,
  template: `
      <header class="lg-header">
          <a [routerLinkActiveOptions]="{ exact: false }"
             [routerLinkActive]="['route-active']"
             [routerLink]="'/home'"
             class="lg-header__icon">
              <mat-icon aria-hidden="false" fontIcon="home"></mat-icon>
          </a>

          <div class="lg-header__inner">
              @for (item of items();track item.label) {
                  <a [routerLink]="item.link"
                     [routerLinkActive]="['route-active']"
                     [routerLinkActiveOptions]="{ exact: false }"
                     class="lg-header__link">
                      {{ item.label }}
                  </a>
              }
          </div>

          <a [routerLinkActiveOptions]="{ exact: false }"
             [routerLinkActive]="['route-active']"
             [routerLink]="'/settings'"
             class="lg-header__icon">
              <mat-icon aria-hidden="false" fontIcon="settings"></mat-icon>
          </a>

          <a [routerLinkActiveOptions]="{ exact: false }"
             [routerLinkActive]="['route-active']"
             [routerLink]="'/widgets'"
             class="lg-header__icon">
              <mat-icon aria-hidden="false" fontIcon="widgets"></mat-icon>
          </a>
      </header>
  `,
  styles: [`
    .lg-header {
      position: fixed;
      z-index: 3;
      height: var(--header-height);
      left: 0;
      right: 0;
      top: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      overflow-x: auto;
      white-space: nowrap;
      padding: 0 16px;
      @media (max-width: 768px) {
        justify-content: normal;
        scroll-snap-type: both mandatory;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
      }
    }

    .lg-header__inner {
      display: flex;
      border-radius: 35px;
      padding: 8px;
      backdrop-filter: blur(3px);
      background-color: rgba(255, 255, 255, 0.7);
    }

    .lg-header__link {
      font-size: 1rem;
      font-family: inherit;
      text-decoration: none;
      padding: 8px 24px;
      border-radius: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      scroll-snap-align: center;
    }

    .lg-header__link.route-active {
      background-color: #a26dc7;
      color: #fff;
    }

    .lg-header__icon {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      cursor: pointer;
      scroll-snap-align: center;

      backdrop-filter: blur(3px);
      background-color: rgba(255, 255, 255, 0.7);
    }

    .lg-header__icon.route-active {
      background-color: #a26dc7;
      color: #fff;
    }
  `],
  imports: [
    ButtonComponent,
    GapRowComponent,
    RouterLink,
    RouterLinkActive,
    MatIcon,
  ]
})
export class HeaderComponent {
  constructor() {
  }

  items = signal([
    {
      label: 'Recipes',
      link: '/recipes',
    },
    {
      label: 'Products',
      link: '/products',
    }
  ]);
  activeIndex = signal(0);
  links = viewChildren(ButtonComponent)

  setActive(index: number) {
    this.activeIndex.set(index);
  }

}
