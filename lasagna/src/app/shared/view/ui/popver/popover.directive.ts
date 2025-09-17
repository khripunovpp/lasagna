import {Directive, ElementRef, inject, input, signal, TemplateRef} from '@angular/core';
import {ConnectedPosition, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {PopoverComponent} from './popover.component';

@Directive({
  selector: '[lgPopover]'
})
export class PopoverDirective {
  tooltipText = input<string>('');                          // если просто текст
  tooltipTemplate = input<TemplateRef<unknown> | null>(null); // если шаблон
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');
  private overlay = inject(Overlay);
  private host = inject(ElementRef<HTMLElement>);
  private overlayRef = signal<OverlayRef | null>(null);
  private readonly _positions: Record<string, ConnectedPosition[]> = {
    top: [{originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8}],
    bottom: [{originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8}],
    left: [{originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8}],
    right: [{originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8}],
  };

  ngOnInit() {

  }

  show() {
    if (this.overlayRef()) return;
    console.log('Show popover');

    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.host)
      .withPositions(this.getPositions())
      .withFlexibleDimensions(true)
      .withPush(true);

    const ref = this.overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const portal = new ComponentPortal(PopoverComponent);
    const tooltipRef = ref.attach(portal);

    tooltipRef.setInput('text', this.tooltipText());
    tooltipRef.setInput('contentTemplate', this.tooltipTemplate());

    ref.backdropClick().subscribe(() => this.hide());

    this.overlayRef.set(ref);
  }

  hide() {
    this.overlayRef()?.dispose();
    this.overlayRef.set(null);
  }

  private getPositions(): ConnectedPosition[] {
    return this._positions[this.tooltipPosition()] || this._positions['top'];
  }
}
