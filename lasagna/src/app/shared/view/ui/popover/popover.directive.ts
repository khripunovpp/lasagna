import {
  Directive,
  effect,
  ElementRef,
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

const POSITIONS: Record<PopoverPosition, ConnectedPosition[]> = {
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

@Directive({
  selector: '[lgPopover]',
  host: {'(click)': 'toggle($event)'},
})
export class PopoverDirective implements PopoverRef, OnDestroy {
  constructor() {
    this._service.register(this);
  }

  lgPopover = input.required<TemplateRef<any>>();
  lgPopoverPosition = input<PopoverPosition>('bottom');
  lgPopoverCloseOnOther = input<boolean>(true);
  lgPopoverOpen = output<void>();
  lgPopoverClose = output<void>();
  private _overlay = inject(Overlay);
  private _host = inject(ElementRef<HTMLElement>);
  private _vcr = inject(ViewContainerRef);
  private _service = inject(PopoverService);
  private _overlayRef: OverlayRef | null = null;
  // Reposition when position input changes while popover is open
  private _positionEffect = effect(() => {
    const pos = this.lgPopoverPosition();
    if (!this._overlayRef) return;
    const strategy = this._overlayRef.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    strategy.withPositions(POSITIONS[pos]);
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

    const strategy = this._overlay
      .position()
      .flexibleConnectedTo(this._host)
      .withPositions(POSITIONS[this.lgPopoverPosition()])
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(8);

    this._overlayRef = this._overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'lg-popover-panel',
    });

    this._overlayRef.attach(new TemplatePortal(this.lgPopover(), this._vcr));

    strategy.positionChanges.subscribe(({ connectionPair: p }) => {
      const panel = this._overlayRef?.overlayElement;
      if (!panel) return;
      panel.classList.remove(
        'lg-popover-panel--from-top',
        'lg-popover-panel--from-bottom',
        'lg-popover-panel--from-left',
        'lg-popover-panel--from-right',
      );
      if (p.overlayY === 'top')    panel.classList.add('lg-popover-panel--from-top');
      else if (p.overlayY === 'bottom') panel.classList.add('lg-popover-panel--from-bottom');
      else if (p.overlayX === 'start')  panel.classList.add('lg-popover-panel--from-left');
      else                              panel.classList.add('lg-popover-panel--from-right');
    });

    this._overlayRef.backdropClick().subscribe(() => this.close());
    this._overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    this.lgPopoverOpen.emit();
  }

  close() {
    if (!this._overlayRef) return;
    const overlayRef = this._overlayRef;
    this._overlayRef = null;

    const panel = overlayRef.overlayElement;
    panel.classList.add('lg-popover-panel--closing');

    let done = false;
    const dispose = () => {
      if (done) return;
      done = true;
      overlayRef.dispose();
      this.lgPopoverClose.emit();
    };

    panel.addEventListener('animationend', dispose, { once: true });
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
