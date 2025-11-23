import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {WINDOW} from '../../service/tokens/window.token';

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
export class PortalComponent
  implements AfterViewInit, OnDestroy, OnChanges {
  constructor(
    private renderer: Renderer2,
    private _elementRef: ElementRef,
  ) {
  }

  @Input() targetElement!: ElementRef | HTMLElement | null;
  @Input() appendTarget: string = '';
  @Input() wrapClass: string = '';
  private portalContainer!: HTMLElement;
  private readonly _window = inject(WINDOW);

  private get _appendTarget() {
    if (!this.appendTarget) {
      return this._elementRef.nativeElement;
    }
    return this.appendTarget === 'body'
      ? this._window?.document.body
      : this.appendTarget;
  }

  ngOnChanges(
    changes: SimpleChanges
  ) {
    if (changes['wrapClass'] && this.portalContainer) {
      if (this.wrapClass) {
        const classes = this.wrapClass.split(' ');
        classes.forEach(c => this.renderer.addClass(this.portalContainer, c));
      } else {
        this.portalContainer.className = '';
      }
    }
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
