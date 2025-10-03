import {Component, input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Editor, NgxEditorComponent, NgxEditorMenuComponent, Toolbar} from 'ngx-editor';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-html-editor',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ngx-editor-menu [toolbar]="toolbar" [editor]="editor"></ngx-editor-menu>
    <ngx-editor
      (ngModelChange)="onEditorChanged($event)"
      [disabled]="false"
      [ngModelOptions]="{standalone: true}"
      [editor]="editor"
      [ngModel]="html"
      [placeholder]="placeholder()"
    ></ngx-editor>
  `,
  imports: [
    NgxEditorMenuComponent,
    NgxEditorComponent,
    FormsModule
  ],
  styles: [`
    lg-html-editor {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .html-editor {
      width: 100%;
      height: 200px;
      margin-bottom: 10px;
      font-family: monospace;
    }

    .preview {
      border: 1px solid #ccc;
      padding: 10px;
      min-height: 200px;
      background-color: #f9f9f9;
    }

    .NgxEditor {
      min-height: 200px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HtmlEditorComponent,
      multi: true
    }
  ]
})
export class HtmlEditorComponent
  implements ControlValueAccessor, OnDestroy {
  html: string = '';
  placeholder = input('');
  readonly editor = new Editor();
  readonly toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onChange = (html: string) => {
  };
  onTouched = () => {
  }

  writeValue(html: string): void {
    this.html = html;
    debugger
  }

  registerOnChange(fn: (html: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onEditorChanged(
    html: string
  ) {
    debugger
    this.html = html;
    this.onChange(html);
  }
}
