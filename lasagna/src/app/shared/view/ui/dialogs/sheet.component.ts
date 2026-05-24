import {Component, computed, effect, HostListener, inject, input, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FocusTrapDirective} from '../../directives/focus-trap.directive';
import {BODY_LOCKER} from '../../../service/providers/body-locker.provider';
import {matchMediaSignal} from '../../signals/match-media.signal';
import {mobileBreakpoint} from '../../const/breakpoints';

@Component({
  selector: 'lg-sheet',
  standalone: true,
  imports: [TranslatePipe, FocusTrapDirective],
  template: `
    <div class="sheet"
         [class.sheet--open]="displayed()"
         [class.sheet--bottom]="placement() === 'bottom'"
         [class.sheet--right]="placement() === 'right'"
         [attr.aria-hidden]="!displayed()">
      <div class="sheet__backdrop" (click)="close()"></div>
      <div class="sheet__panel" lgFocusTrap role="dialog" aria-modal="true">
        <div class="sheet__header">
          <h3 class="sheet__title">{{ title() }}</h3>
          <button type="button"
                  class="sheet__close"
                  [attr.data-u2e]="'sheet-' + name() + '.close-button'"
                  (click)="close()"
                  [attr.aria-label]="'close-label' | translate">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="sheet__body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .sheet {
      position: fixed;
      inset: 0;
      z-index: 100;
      pointer-events: none;
      visibility: hidden;
      transition: visibility 0.25s;
    }

    .sheet--open {
      pointer-events: auto;
      visibility: visible;
    }

    .sheet__backdrop {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .sheet__panel {
      position: absolute;
      background: var(--card-bg);
      color: var(--text-color);
      display: flex;
      flex-direction: column;
      box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.06);
      transition: transform 0.25s ease-in-out;
      border-radius: 16px;
    }

    .sheet--bottom .sheet__panel {
      left: 0;
      right: 0;
      bottom: 0;
      height: 65vh;
      max-height: 65vh;
      border-radius: 16px 16px 0 0;
      transform: translateY(100%);
    }

    .sheet--right .sheet__panel {
      top: 8px;
      right: 8px;
      bottom: 8px;
      width: clamp(320px, 420px, 100%);
      transform: translateX(100%);
    }

    .sheet--open.sheet--bottom .sheet__panel,
    .sheet--open.sheet--right .sheet__panel {
      transform: translate(0, 0);
    }

    .sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 24px;
      border-bottom: 1px solid var(--border-light);
      flex: 0 0 auto;
    }

    .sheet__title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--text-color);
    }

    .sheet__close {
      appearance: none;
      border: none;
      background: var(--secondary-light-color);
      color: var(--text-color);
      font-family: inherit;
      font-size: 22px;
      line-height: 1;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease-in-out;
    }

    .sheet__close:hover {
      transform: scale(0.92);
    }

    .sheet__body {
      flex: 1 1 auto;
      overflow-y: auto;
      padding: 16px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `]
})
export class SheetComponent {
  readonly name = input('sheet');
  readonly title = input('');

  readonly displayed = signal(false);
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
  readonly placement = computed<'bottom' | 'right'>(() => this.isMobile() ? 'bottom' : 'right');

  readonly #_bodyLocker = inject(BODY_LOCKER);

  readonly #_lockEffect = effect(() => {
    if (this.displayed()) {
      this.#_bodyLocker.lock();
    } else {
      this.#_bodyLocker.unlock();
    }
  });

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.displayed()) {
      this.close();
    }
  }

  open() {
    this.displayed.set(true);
  }

  close() {
    this.displayed.set(false);
  }

  toggle() {
    this.displayed.update(v => !v);
  }
}
