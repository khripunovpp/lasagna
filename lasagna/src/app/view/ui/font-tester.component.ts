import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lg-font-tester',
  template: '',
})
export class FontTesterComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const fontName = params.get('font');

      if (fontName) {
        const formattedFontName = fontName.replace(/ /g, '+');
        const fontFamily = fontName;

        // Добавляем link в head
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'stylesheet');
        this.renderer.setAttribute(
          link,
          'href',
          `https://fonts.googleapis.com/css2?family=${formattedFontName}&display=swap`
        );
        this.renderer.appendChild(document.head, link);

        const copyStyleAttribute = document.body.getAttribute('style') || '';

        // Добавляем переменную в body
        this.renderer.setAttribute(
          document.body,
          'style',
          `--text-font: ${fontFamily}; ${copyStyleAttribute}`
        );
      }
    });
  }
}
