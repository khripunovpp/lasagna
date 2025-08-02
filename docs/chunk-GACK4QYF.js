import {
  Component,
  input,
  output,
  setClassMetadata,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵviewQuerySignal
} from "./chunk-KM6KLH7M.js";

// src/app/shared/view/ui/form/upload.component.ts
var _c0 = ["input"];
var _c1 = ["*"];
var UploadComponent = class _UploadComponent {
  filesSelected = output();
  accept = input(".csv");
  input = viewChild("input");
  onFileChange(event) {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
      this.filesSelected.emit([file]);
    }
  }
  clear() {
    if (!this.input()?.nativeElement) {
      return;
    }
    this.input().nativeElement.value = "";
    this.input().nativeElement.files = null;
  }
  static \u0275fac = function UploadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UploadComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UploadComponent, selectors: [["lg-upload"]], viewQuery: function UploadComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.input, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { accept: [1, "accept"] }, outputs: { filesSelected: "filesSelected" }, ngContentSelectors: _c1, decls: 5, vars: 1, consts: [["input", ""], [1, "lg-upload", 3, "click"], ["type", "file", 3, "change", "accept"], [1, "lg-upload__content"]], template: function UploadComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275listener("click", function UploadComponent_Template_div_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        const input_r2 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(input_r2.click());
      });
      \u0275\u0275elementStart(1, "input", 2, 0);
      \u0275\u0275listener("change", function UploadComponent_Template_input_change_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3);
      \u0275\u0275projection(4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("accept", ctx.accept());
    }
  }, styles: ["\n\ninput[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=upload.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadComponent, [{
    type: Component,
    args: [{ selector: "lg-upload", standalone: true, template: `
      <div (click)="input.click()" class="lg-upload">
          <input #input
                 (change)="onFileChange($event)"
                 [accept]="accept()"
                 type="file">
          <div class="lg-upload__content">
              <ng-content></ng-content>
          </div>
      </div>
  `, styles: ["/* angular:styles/component:scss;aa66937196ea73175d006d3b4df3a0286a1cd79dffe59a7b4c8902f702b0c4f0;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/upload.component.ts */\ninput {\n  display: none;\n}\n/*# sourceMappingURL=upload.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UploadComponent, { className: "UploadComponent", filePath: "src/app/shared/view/ui/form/upload.component.ts", lineNumber: 25 });
})();

export {
  UploadComponent
};
//# sourceMappingURL=chunk-GACK4QYF.js.map
