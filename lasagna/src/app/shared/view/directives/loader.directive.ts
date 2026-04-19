import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  createComponent,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  Input,
  inputBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from "@angular/core";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";
import {LoadersManagerService} from '../../service/services/loaders-manager.service';

const animationHideDuration = 800;
const animationDuration = 1000;

/**
 * Директива для отображения лоадера внутри элемента.
 *
 * При инициализации директива добавляет в хост элемент, перед закрывающим тегом, компонент лоадера.
 *
 * Лоадер отображается/скрывается в зависимости от состояния скоупа, переданного в директиву.
 * Если скоуп не передан, используется скоуп '*'.
 */
@Directive({
  selector: '[lgLoader]',
  exportAs: 'lgLoader',
})
export class LoaderDirective
  implements OnInit,
    OnDestroy {
  constructor() {
  }

  @Input() loaderSize: 'small' | 'medium' | 'large' | 'zero' = 'zero';
  @Input() loaderScope: string = '*';
  @Input() loaderFixed: boolean = false;
  @Input() disableLoader: boolean = false;
  private _host = inject(ElementRef<HTMLElement>);
  private _loadersManagerService = inject(LoadersManagerService);
  private _renderer = inject(Renderer2);
  private _environmentInjector = inject(EnvironmentInjector);
  private _destroyRef = inject(DestroyRef);
  private readonly _appRef = inject(ApplicationRef);
  private _loaderRef: ComponentRef<LoaderComponent> | null = null;
  private _timerRef: any = null;
  private _title = computed(() => this._loadersManagerService.contentMap()[this.loaderScope]?.title);
  private _text = computed(() => this._loadersManagerService.contentMap()[this.loaderScope]?.text);

  ngOnInit(): void {
    this.injectLoaderComponent();

    if (this.disableLoader) {
      return;
    }

    this._loadersManagerService.observeScope(this.loaderScope)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: state => {
          if (state) {
            this._runLoader();
          } else {
            this._stopLoader();
          }
        },
      })
  }

  ngOnDestroy(): void {
    this.ejectLoaderComponent();
    this._timerRef && clearTimeout(this._timerRef);
  }

  /**
   * Инжектирует компонент лоадера в хост элемент.
   */
  injectLoaderComponent() {
    if (this._loaderRef) {
      this.ejectLoaderComponent();
    }

    this._loaderRef = createComponent(LoaderComponent, {
      environmentInjector: this._environmentInjector,
      bindings: [
        inputBinding('title', this._title),
        inputBinding('text', this._text),
        inputBinding('fixed', () => this.loaderFixed),
      ]
    });
    this._renderer.addClass(this._host.nativeElement, `lg-loader--${this.loaderSize}`);
    this._appRef.attachView(this._loaderRef.hostView);
    this._host.nativeElement.appendChild(this._loaderRef.location.nativeElement);
  }

  /**
   * Удаляет компонент лоадера из хост элемента.
   */
  ejectLoaderComponent(): void {
    if (!this._loaderRef) return;

    this._loaderRef.destroy();
    this._loaderRef = null;
  }

  private _runLoader(): void {
    if (this.disableLoader) return;
    if (this._timerRef) {
      clearTimeout(this._timerRef);
      this._timerRef = null;
    }
    this._renderer.addClass(this._host.nativeElement, 'lg-loader-running');
    this._renderer.setStyle(this._host.nativeElement, 'position', 'relative');
  }

  private _stopLoader(): void {
    if (this._timerRef) {
      clearTimeout(this._timerRef);
      this._timerRef = null;
    }

    this._renderer.removeClass(this._host.nativeElement, 'lg-loader-running');

    // хотим чтобы анимация скрытия отработала до конца, прежде чем убирать position: relative
    this._timerRef = setTimeout(() => {
      this._renderer.removeStyle(this._host.nativeElement, 'position');
    }, animationHideDuration + 100);
  }
}

/**
 * Компонент лоадера.
 */
@Component({
  selector: 'lg-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lg-loader',
    '[class.lg-loader--fixed]': 'fixed',
  },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="lg-loader__inner">
      @if (title()) {
        <div class="lg-loader__title">{{ title() }}</div>
      }
      @if (text()) {
        <div class="lg-loader__text">{{ text() }}</div>
      }
    </div>
  `,
  styles: [`
    @keyframes scopedLoaderAnimation {
      0% {
        background-position: -100dvw 0
      }
      100% {
        background-position: 100dvw 0
      }
    }

    .lg-loader {
    }

    .lg-loader,
    .lg-loader__inner {
      position: absolute;
      z-index: 3333;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    }


    .lg-loader,
    .lg-loader__inner,
    .lg-loader__title,
    .lg-loader__text {
      opacity: 0;
      visibility: hidden;
      transition: opacity ${animationHideDuration}ms ease, visibility ${animationHideDuration}ms ease;
    }

    .lg-loader__inner {
      background: #f6f7f8;
      background: linear-gradient(to right, rgba(255, 255, 255, 0.5) 8%,
        rgba(230, 230, 230, 0.5) 38%,
        rgba(255, 255, 255, 0.5) 54%);
      background-size: 200dvw 100dvh;
      background-position: -100dvw 0;
      background-attachment: fixed;
      animation-duration: ${animationDuration}ms;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-play-state: paused;
      animation-name: scopedLoaderAnimation;
      padding: 24px;
    }

    .lg-loader__inner::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      z-index: -1;
      border-radius: 0;
      background: radial-gradient(circle, #ffffff 0%, #ef452969 100%);
    }

    .lg-loader-running > .lg-loader,
    .lg-loader-running > .lg-loader .lg-loader__inner,
    .lg-loader-running > .lg-loader .lg-loader__title,
    .lg-loader-running > .lg-loader .lg-loader__text {
      opacity: 1;
      visibility: visible;
    }

    .lg-loader-running > .lg-loader {
    }

    .lg-loader-running > .lg-loader .lg-loader__inner {
      animation-play-state: running;
    }

    .lg-loader--small > .lg-loader .lg-loader__inner {
      border-radius: 16px;
    }

    .lg-loader--medium > .lg-loader .lg-loader__inner {
      border-radius: 24px;
    }

    .lg-loader--large > .lg-loader .lg-loader__inner {
      border-radius: 32px;
    }

    .lg-loader--zero > .lg-loader .lg-loader__inner {
      border-radius: 0px;
    }

    .lg-loader--fixed {
      position: fixed;
    }

    .lg-loader__title {
      font-size: 20px;
      line-height: 1.5;
      text-align: center;
    }

    .lg-loader__text {
      text-align: center;
      margin-top: 8px;
    }
  `],
})
export class LoaderComponent {
  constructor() {
  }

  title = input<string>('');
  text = input<string>('');
  fixed = input<boolean>();
}
