import {
  OnboardingService
} from "./chunk-BUGRPEBT.js";
import {
  SettingsService
} from "./chunk-MV7X5YHM.js";
import {
  IS_CLIENT
} from "./chunk-QHJLSFIB.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-AESGXZO7.js";
import "./chunk-2CTN2MPX.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import {
  Component,
  inject,
  setClassMetadata,
  setClassMetadataAsync,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/settings.component.ts
var SettingsComponent_Defer_2_DepsFn = () => [import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-4VXAWJ5Q.js").then((m) => m.LocalisationSettingsComponent), import("./chunk-STEANTW2.js").then((m) => m.BackupSettingsComponent), import("./chunk-S4BENQO2.js").then((m) => m.TabDirective), import("./chunk-GJSVK3AJ.js").then((m) => m.TabsComponent), import("./chunk-PVVWUORA.js").then((m) => m.InvoicesSettingsComponent), import("./chunk-3F6VNZV7.js").then((m) => m.LogCenterPageComponent), import("./chunk-IUFMAC66.js").then((m) => m.CategoryListComponent), import("./chunk-Q2XBLGVJ.js").then((m) => m.CategoryRecipeListComponent), import("./chunk-7H7OXKDA.js").then((m) => m.FlexColumnComponent), import("./chunk-3QNACHDK.js").then((m) => m.AddCategoryFormComponent), import("./chunk-6UDKPC2T.js").then((m) => m.AddCategoryRecipeFormComponent), TranslatePipe];
function SettingsComponent_Defer_0_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-language-settings");
  }
}
function SettingsComponent_Defer_0_ng_template_8_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-column")(1, "lg-add-category-form", 7);
    \u0275\u0275listener("onSaved", function SettingsComponent_Defer_0_ng_template_8_ng_template_1_Template_lg_add_category_form_onSaved_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editedCategoryProduct.set(""));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "lg-category-list", 8);
    \u0275\u0275listener("onEdit", function SettingsComponent_Defer_0_ng_template_8_ng_template_1_Template_lg_category_list_onEdit_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editedCategoryProduct.set($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("uuid", ctx_r1.editedCategoryProduct());
  }
}
function SettingsComponent_Defer_0_ng_template_8_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-column")(1, "lg-add-category-recipe-form", 7);
    \u0275\u0275listener("onSaved", function SettingsComponent_Defer_0_ng_template_8_ng_template_3_Template_lg_add_category_recipe_form_onSaved_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editedCategoryRecipe.set(""));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "lg-category-recipe-list", 8);
    \u0275\u0275listener("onEdit", function SettingsComponent_Defer_0_ng_template_8_ng_template_3_Template_lg_category_recipe_list_onEdit_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editedCategoryRecipe.set($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("uuid", ctx_r1.editedCategoryRecipe());
  }
}
function SettingsComponent_Defer_0_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-tabs", 5);
    \u0275\u0275template(1, SettingsComponent_Defer_0_ng_template_8_ng_template_1_Template, 3, 1, "ng-template", 6);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275template(3, SettingsComponent_Defer_0_ng_template_8_ng_template_3_Template, 3, 1, "ng-template", 6);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("flat", true)("scrollable", false)("silent", true);
    \u0275\u0275advance();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(2, 5, "categories.products.link-label"));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(4, 7, "categories.recipes.link-label"));
  }
}
function SettingsComponent_Defer_0_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-invoices-settings");
  }
}
function SettingsComponent_Defer_0_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-backup-settings");
  }
}
function SettingsComponent_Defer_0_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-log-center-page");
  }
}
function SettingsComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-title");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "lg-tabs");
    \u0275\u0275template(6, SettingsComponent_Defer_0_ng_template_6_Template, 1, 0, "ng-template", 0);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275template(8, SettingsComponent_Defer_0_ng_template_8_Template, 5, 9, "ng-template", 1);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275template(10, SettingsComponent_Defer_0_ng_template_10_Template, 1, 0, "ng-template", 2);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275template(12, SettingsComponent_Defer_0_ng_template_12_Template, 1, 0, "ng-template", 3);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275template(14, SettingsComponent_Defer_0_ng_template_14_Template, 1, 0, "ng-template", 4);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 10, "settings.title"));
    \u0275\u0275advance(3);
    \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(7, 12, "language.settings-title")));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(9, 14, "categories.settings-title")));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(11, 16, "settings.invoice.title"));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(13, 18, "backup.settings-title")));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(15, 20, "log-center.title")));
  }
}
function SettingsComponent_DeferError_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.defer-load-error"), "\n");
  }
}
var SettingsComponent = class _SettingsComponent {
  settingsService;
  constructor(settingsService) {
    this.settingsService = settingsService;
  }
  isClient = inject(IS_CLIENT);
  editedCategoryProduct = signal("", ...ngDevMode ? [{ debugName: "editedCategoryProduct" }] : []);
  editedCategoryRecipe = signal("", ...ngDevMode ? [{ debugName: "editedCategoryRecipe" }] : []);
  _onboardingService = inject(OnboardingService);
  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    this._onboardingService.markSettingsDone();
  }
  static \u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsComponent)(\u0275\u0275directiveInject(SettingsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["lg-settings"]], decls: 4, vars: 0, consts: [["alias", "language", "lgTab", "", 3, "label"], ["alias", "categoires", "lgTab", "", 3, "label"], ["alias", "invoice", "lgTab", "", 3, "label"], ["alias", "backup", "lgTab", "", 3, "label"], ["alias", "logs", "lgTab", "", 3, "label"], [3, "flat", "scrollable", "silent"], ["alias", "system", "lgTab", "", 3, "label"], [3, "onSaved", "uuid"], [3, "onEdit"]], template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domTemplate(0, SettingsComponent_Defer_0_Template, 16, 22)(1, SettingsComponent_DeferError_1_Template, 2, 3);
      \u0275\u0275defer(2, 0, SettingsComponent_Defer_2_DepsFn, null, null, 1);
      \u0275\u0275deferOnIdle();
    }
  }, dependencies: [TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(SettingsComponent, () => [import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-4VXAWJ5Q.js").then((m) => m.LocalisationSettingsComponent), import("./chunk-STEANTW2.js").then((m) => m.BackupSettingsComponent), import("./chunk-S4BENQO2.js").then((m) => m.TabDirective), import("./chunk-GJSVK3AJ.js").then((m) => m.TabsComponent), import("./chunk-PVVWUORA.js").then((m) => m.InvoicesSettingsComponent), import("./chunk-3F6VNZV7.js").then((m) => m.LogCenterPageComponent), import("./chunk-IUFMAC66.js").then((m) => m.CategoryListComponent), import("./chunk-Q2XBLGVJ.js").then((m) => m.CategoryRecipeListComponent), import("./chunk-7H7OXKDA.js").then((m) => m.FlexColumnComponent), import("./chunk-3QNACHDK.js").then((m) => m.AddCategoryFormComponent), import("./chunk-6UDKPC2T.js").then((m) => m.AddCategoryRecipeFormComponent)], (ContainerComponent, TitleComponent, FadeInComponent, LocalisationSettingsComponent, BackupSettingsComponent, TabDirective, TabsComponent, InvoicesSettingsComponent, LogCenterPageComponent, CategoryListComponent, CategoryRecipeListComponent, FlexColumnComponent, AddCategoryFormComponent, AddCategoryRecipeFormComponent) => {
    setClassMetadata(SettingsComponent, [{
      type: Component,
      args: [{ selector: "lg-settings", standalone: true, imports: [
        ContainerComponent,
        TitleComponent,
        FadeInComponent,
        LocalisationSettingsComponent,
        BackupSettingsComponent,
        TranslatePipe,
        TabDirective,
        TabsComponent,
        InvoicesSettingsComponent,
        LogCenterPageComponent,
        CategoryListComponent,
        CategoryRecipeListComponent,
        FlexColumnComponent,
        AddCategoryFormComponent,
        AddCategoryRecipeFormComponent
      ], template: `@defer {
  <lg-fade-in>
    <lg-container>
      <lg-title>{{ 'settings.title'|translate }}</lg-title>

      <lg-tabs>
        <ng-template alias="language" label="{{ 'language.settings-title'|translate }}" lgTab>
          <lg-language-settings></lg-language-settings>
        </ng-template>

        <ng-template alias="categoires" label="{{ 'categories.settings-title'|translate }}" lgTab>
          <lg-tabs [flat]="true"
                   [scrollable]="false"
                   [silent]="true">
            <ng-template [label]="'categories.products.link-label' | translate" alias="system" lgTab>
              <lg-flex-column>
                <lg-add-category-form (onSaved)="editedCategoryProduct.set('')"
                                      [uuid]="editedCategoryProduct()"></lg-add-category-form>
                <lg-category-list (onEdit)="editedCategoryProduct.set($event)"></lg-category-list>
              </lg-flex-column>
            </ng-template>

            <ng-template [label]="'categories.recipes.link-label' | translate" alias="system" lgTab>
              <lg-flex-column>
                <lg-add-category-recipe-form (onSaved)="editedCategoryRecipe.set('')"
                                             [uuid]="editedCategoryRecipe()"></lg-add-category-recipe-form>
                <lg-category-recipe-list (onEdit)="editedCategoryRecipe.set($event)"></lg-category-recipe-list>
              </lg-flex-column>
            </ng-template>
          </lg-tabs>
        </ng-template>

        <ng-template [label]="'settings.invoice.title' | translate" alias="invoice" lgTab>
          <lg-invoices-settings></lg-invoices-settings>
        </ng-template>

        <!--      <ng-template [label]="'settings.credentials.title' | translate" alias="credentials" lgTab>-->
        <!--        <lg-credentials-settings></lg-credentials-settings>-->
        <!--      </ng-template>-->

        <!--      <ng-template [label]="'settings.taxes.title' | translate" alias="taxes" lgTab>-->
        <!--        <lg-taxes-settings></lg-taxes-settings>-->
        <!--      </ng-template>-->

        <ng-template alias="backup" label="{{ 'backup.settings-title'|translate }}" lgTab>
          <lg-backup-settings></lg-backup-settings>
        </ng-template>

        <ng-template alias="logs" label="{{ 'log-center.title'|translate }}" lgTab>
          <lg-log-center-page></lg-log-center-page>
        </ng-template>
      </lg-tabs>
    </lg-container>
  </lg-fade-in>
} @error {
  {{ 'settings.defer-load-error' | translate }}
}
` }]
    }], () => [{ type: SettingsService }], null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/features/settings/view/settings.component.ts", lineNumber: 49 });
})();
export {
  SettingsComponent
};
//# sourceMappingURL=chunk-WNIM2TOQ.js.map
