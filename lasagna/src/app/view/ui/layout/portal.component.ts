import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';

@Component({
  selector: 'lg-portal',
  standalone: true,
  template: '',
  styles: [
    `
        :host {
            display: flex;
            height: 100%;
            width: 100%;
        }
    `
  ]
})
export class PortalComponent implements AfterViewInit, OnDestroy {
  constructor(
      private renderer: Renderer2,
      private _elementRef: ElementRef,
  ) {
  }

  @Input() targetElement!: ElementRef | HTMLElement | null;
  @Input() appendTarget: string = '';
  @Input() wrapClass: string = '';
  private portalContainer!: HTMLElement;

  private get _appendTarget() {
    if (!this.appendTarget) {
      return this._elementRef.nativeElement;
    }
    return this.appendTarget === 'body'
        ? document.body
        : this.appendTarget;
  }

  ngAfterViewInit() {
    this.portalContainer = this.renderer.createElement('div');
    this.renderer.appendChild(this._appendTarget, this.portalContainer);

    if (this.targetElement) {

      if (this.wrapClass) {
        const classes = this.wrapClass.split(' ');
        classes.forEach(c => this.renderer.addClass(this.portalContainer, c));
      }
      this.renderer.appendChild(this.portalContainer, this.targetElement);
    }
  }

  ngOnDestroy() {
    if (this.targetElement) {
      this.renderer.removeChild(this.portalContainer, this.targetElement);
    }
    this.renderer.removeChild(this._appendTarget, this.portalContainer);
  }
}
