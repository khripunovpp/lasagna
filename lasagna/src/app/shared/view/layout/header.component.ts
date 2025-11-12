import {Component, Signal, signal, viewChildren} from '@angular/core';
import {ButtonComponent} from '../ui/button/button.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {Location, NgOptimizedImage} from '@angular/common';
import {GlobalSearchService} from '../../service/services';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageService} from '../../../features/settings/service/services/language.service';
import {DemoInformerComponent} from '../../../features/home/view/demo-informer.component';
import {FadeInComponent} from '../ui/fade-in.component';

@Component({
  selector: 'lg-header',
  standalone: true,
  template: `
    <lg-fade-in>
      <header class="lg-header">
        <div class="lg-header__left">
          @if (window.history.state && window.history.length > 1) {
            <button (click)="location.back()"
                    class="lg-header__icon lg-header__icon--left">
              <mat-icon aria-hidden="false" fontIcon="arrow_back"></mat-icon>
            </button>
          }

          <a [routerLinkActiveOptions]="{ exact: false }"
             [routerLinkActive]="['route-active']"
             [routerLink]="'/home'"
             class="lg-header__logo">

            <img height="50"
                 ngSrc="./logomark.svg"
                 width="50"/>
          </a>
        </div>

        <div class="lg-header__leftToMiddle">

          <lg-demo-informer></lg-demo-informer>

          <button (click)="globalSearchService.showBar()"
                  class="lg-header__icon">
            <mat-icon aria-hidden="false" fontIcon="search"></mat-icon>
          </button>
        </div>

        <div class="lg-header__middle">
          <div class="lg-header__inner">
            @for (item of items(); track item.label) {
              <a [routerLink]="item.link"
                 [routerLinkActive]="['route-active']"
                 [routerLinkActiveOptions]="{ exact: false }"
                 class="lg-header__link">
                {{ item.label | translate }}
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

          <a [routerLinkActiveOptions]="{ exact: false }"
             [routerLinkActive]="['route-active']"
             [routerLink]="'/docs'"
             class="lg-header__icon">
            <mat-icon aria-hidden="false" fontIcon="question_mark"></mat-icon>
          </a>
        </div>

        <div class="lg-header__right">

        </div>
      </header>
    </lg-fade-in>
  `,
  styles: [`
    :host {
      position: fixed;
      z-index: 3;
      left: 50%;
      right: 0;
      top: 12px;
      transform: translateX(-50%);
      max-width: calc(var(--container-width) + 32px);
      width: calc(100% - 32px);
      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .lg-demo-informer {

    }

    .lg-header {
      height: var(--header-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
      padding: 0 16px;
      scroll-snap-type: x mandatory;
      @media (max-width: 768px) {
        justify-content: normal;
        scroll-snap-type: both mandatory;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
      }

      &::after {
        content: '';
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        width: 100dvw;
        height: 100px;
        pointer-events: none;
        backdrop-filter: blur(3px);
        z-index: -1;
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
        will-change: transform;
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
      min-width: 40px;
      @media (max-width: 768px) {
        flex: 0 0 auto;
        min-width: 0;
      }
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
      background-color: var(--header-active-bg);
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
      color: inherit;

      &--left {

      }
    }

    .lg-header__logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lg-header__icon.route-active {
      background-color: var(--header-active-bg);
      color: #fff;
    }
  `],
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon,
    TranslatePipe,
    DemoInformerComponent,
    FadeInComponent,
    NgOptimizedImage
  ]
})
export class HeaderComponent {
  constructor(
    public location: Location,
    public globalSearchService: GlobalSearchService,
    private _localizationService: LanguageService,
  ) {
    this.items = signal([
      {
        label: _('recipes.menu-label'),
        link: '/recipes',
      },
      {
        label: _('products.menu-label'),
        link: '/products',
      },
      {
        label: _('invoices.menu-label'),
        link: '/invoices',
      },
    ]);
  }

  items: Signal<{ label: string, link: string }[]>
  activeIndex = signal(0);
  links = viewChildren(ButtonComponent)
  protected readonly window = window;
  protected readonly document = document;

  setActive(index: number) {
    this.activeIndex.set(index);
  }
}
