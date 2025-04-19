import {Component, signal, viewChildren} from '@angular/core';
import {ButtonComponent} from './button.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';
import {GlobalSearchService} from '../../../service/services/global-search.service';

@Component({
  selector: 'lg-header',
  standalone: true,
  template: `
      <header class="lg-header">
          <div class="lg-header__left">
              <button (click)="location.back()"
                      class="lg-header__icon lg-header__icon--left">
                  <mat-icon aria-hidden="false" fontIcon="arrow_back"></mat-icon>
              </button>
          </div>

          <div class="lg-header__leftToMiddle">
              <a [routerLinkActiveOptions]="{ exact: false }"
                 [routerLinkActive]="['route-active']"
                 [routerLink]="'/home'"
                 class="lg-header__icon">
                  <mat-icon aria-hidden="false" fontIcon="home"></mat-icon>
              </a>

              <button (click)="globalSearchService.showBar()"
                      class="lg-header__icon">
                  <mat-icon aria-hidden="false" fontIcon="search"></mat-icon>
              </button>
          </div>

          <div class="lg-header__middle">
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
          </div>
          <div class="lg-header__rightToMiddle">
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
          </div>

          <div class="lg-header__right">

          </div>
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
      justify-content: space-between;
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

    .lg-header__left,
    .lg-header__right,
    .lg-header__leftToMiddle,
    .lg-header__rightToMiddle,
    .lg-header__middle {
      display: flex;
      align-items: center;
      justify-content: center;
      scroll-snap-align: center;
      gap: 8px;
    }

    .lg-header__leftToMiddle {
      margin-left: auto;
    }

    .lg-header__rightToMiddle {
      margin-right: auto;
    }

    .lg-header__right {

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
      transition: all 0.3s ease-in-out;
      appearance: none;
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
      border: none;
      appearance: none;
      backdrop-filter: blur(3px);
      background-color: rgba(255, 255, 255, 0.7);

      &--left {

      }
    }

    .lg-header__icon.route-active {
      background-color: #a26dc7;
      color: #fff;
    }
  `],
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon
  ]
})
export class HeaderComponent {
  constructor(
    public location: Location,
    public globalSearchService: GlobalSearchService,
  ) {
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
