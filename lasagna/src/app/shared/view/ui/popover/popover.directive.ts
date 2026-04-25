import {
  Directive,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnDestroy,
  output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef,} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {PopoverPosition, PopoverRef} from './popover.types';
import {PopoverService} from './popover.service';
import {IS_MOBILE_MEDIA_MATCHED} from '../../../helpers/match-media.helper';

type PopoverDirection = Exclude<PopoverPosition, 'auto'>;

const POSITIONS: Record<PopoverDirection, ConnectedPosition[]> = {
  bottom: [
    {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8},
    {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8},
    {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8},
    {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8},
  ],
  top: [
    {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8},
    {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8},
    {originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8},
    {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8},
  ],
  left: [
    {originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8},
    {originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8},
    {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8},
    {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8},
  ],
  right: [
    {originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8},
    {originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8},
    {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8},
    {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8},
  ],
};

const AUTO_POSITIONS: ConnectedPosition[] = [
  POSITIONS.bottom[0],
  POSITIONS.top[0],
  POSITIONS.right[0],
  POSITIONS.left[0],
];

const resolvePositions = (pos: PopoverPosition): ConnectedPosition[] =>
  pos === 'auto' ? AUTO_POSITIONS : POSITIONS[pos];

@Directive({
  selector: '[lgPopover]',
  exportAs: 'lgPopover',
  host: {
    '(click)': 'toggle($event)',
  },
})
export class PopoverDirective implements PopoverRef, OnDestroy {
  constructor() {
    this._service.register(this);
  }

  lgPopover = input.required<TemplateRef<any>>();
  lgPopoverPosition = input<PopoverPosition>('bottom');
  lgPopoverCloseOnOther = input<boolean>(true);
  lgPopoverCloseOnInnerClick = input<boolean>(false);
  lgPopoverMobileModal = input<boolean>(false);
  lgPopoverOpen = output<void>();
  lgPopoverClose = output<void>();
  private _overlay = inject(Overlay);
  private _host = inject(ElementRef<HTMLElement>);
  private _vcr = inject(ViewContainerRef);
  private _service = inject(PopoverService);
  private _isMobileMatched = inject(IS_MOBILE_MEDIA_MATCHED);
  private _overlayRef: OverlayRef | null = null;
  private _isMobileModal = false;
  // Reposition when position input changes while popover is open
  private _positionEffect = effect(() => {
    const pos = this.lgPopoverPosition();
    if (!this._overlayRef || this._isMobileModal) return;
    const strategy = this._overlayRef.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    strategy.withPositions(resolvePositions(pos));
    this._overlayRef.updatePosition();
  });

  get closeOnOther(): boolean {
    return this.lgPopoverCloseOnOther();
  }

  toggle(event: MouseEvent) {
    event.stopPropagation();
    this._overlayRef ? this.close() : this.open();
  }

  open() {
    if (this._overlayRef) return;

    this._service.closeOthers(this);

    this._isMobileModal = this.lgPopoverMobileModal() && this._isMobileMatched();

    if (this._isMobileModal) {
      const strategy = this._overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();

      this._overlayRef = this._overlay.create({
        positionStrategy: strategy,
        scrollStrategy: this._overlay.scrollStrategies.block(),
        hasBackdrop: true,
        backdropClass: 'lg-popover-backdrop',
        panelClass: ['lg-popover-panel', 'lg-popover-panel--mobile-modal'],
      });

      this._overlayRef.attach(new TemplatePortal(this.lgPopover(), this._vcr));
    } else {
      const strategy = this._overlay
        .position()
        .flexibleConnectedTo(this._host)
        .withPositions(resolvePositions(this.lgPopoverPosition()))
        .withFlexibleDimensions(false)
        .withPush(true)
        .withViewportMargin(8);

      this._overlayRef = this._overlay.create({
        positionStrategy: strategy,
        scrollStrategy: this._overlay.scrollStrategies.close(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        panelClass: 'lg-popover-panel',
        maxWidth: 415
      });

      this._overlayRef.attach(new TemplatePortal(this.lgPopover(), this._vcr));

      strategy.positionChanges
        .subscribe(({connectionPair: p}) => {
          const panel = this._overlayRef?.overlayElement;
          if (!panel) return;
          panel.classList.remove(
            'lg-popover-panel--from-top',
            'lg-popover-panel--from-bottom',
            'lg-popover-panel--from-left',
            'lg-popover-panel--from-right',
          );
          if (p.overlayY === 'top') panel.classList.add('lg-popover-panel--from-top');
          else if (p.overlayY === 'bottom') panel.classList.add('lg-popover-panel--from-bottom');
          else if (p.overlayX === 'start') panel.classList.add('lg-popover-panel--from-left');
          else panel.classList.add('lg-popover-panel--from-right');
        });
    }

    this._overlayRef.backdropClick()
      .subscribe(() => this.close());

    this._overlayRef.keydownEvents()
      .subscribe(e => {
        if (e.key === 'Escape') this.close();
      });

    if (this.lgPopoverCloseOnInnerClick() || this._isMobileModal) {
      this._overlayRef.overlayElement
        .addEventListener('click', () => this.close());
    }

    this.lgPopoverOpen.emit();
  }

  close() {
    if (!this._overlayRef) return;
    const overlayRef = this._overlayRef;
    this._overlayRef = null;
    this._isMobileModal = false;

    const panel = overlayRef.overlayElement;
    panel.classList.add('lg-popover-panel--closing');

    let done = false;
    const dispose = () => {
      if (done) return;
      done = true;
      overlayRef.dispose();
      this.lgPopoverClose.emit();
    };

    panel.addEventListener('animationend', dispose, {once: true});
    setTimeout(dispose, 200); // fallback если анимация не сработала
  }

  isOpen(): boolean {
    return !!this._overlayRef;
  }

  ngOnDestroy() {
    this.close();
    this._service.unregister(this);
  }
}
