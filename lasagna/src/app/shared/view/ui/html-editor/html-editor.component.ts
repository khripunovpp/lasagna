import {Component, DestroyRef, inject, input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Editor, NgxEditorComponent, NgxEditorMenuComponent, Toolbar} from 'ngx-editor';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lg-html-editor',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ngx-editor-menu [editor]="editor"
                     [toolbar]="toolbar"></ngx-editor-menu>
    <ngx-editor [disabled]="false"
                [editor]="editor"
                [formControl]="htmlString"
                [placeholder]="placeholder()"
    ></ngx-editor>
  `,
  imports: [
    NgxEditorMenuComponent,
    NgxEditorComponent,
    FormsModule,
    ReactiveFormsModule
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
  implements ControlValueAccessor, OnDestroy, OnInit {
  constructor() {
  }

  htmlString = new FormControl('');
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

  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.htmlString.valueChanges
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(value => {
        this.onChange(value ?? '');
      });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onChange = (html: string) => {
  };
  onTouched = () => {
  }

  writeValue(html: string): void {
    this.htmlString.setValue(html);
  }

  registerOnChange(fn: (html: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
