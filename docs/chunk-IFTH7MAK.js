import {
  UnitValue,
  marker
} from "./chunk-FGMQFOLX.js";
import {
  Pipe,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/pipes/unitString.pipe.ts
var UnitStringPipe = class _UnitStringPipe {
  _unitMap = {
    [UnitValue.GRAM]: marker("unit.gram"),
    [UnitValue.PIECE]: marker("unit.piece")
  };
  transform(value) {
    return value ? this._unitMap[value] || value : marker("unit.unknown");
  }
  static \u0275fac = function UnitStringPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitStringPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "unitString", type: _UnitStringPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitStringPipe, [{
    type: Pipe,
    args: [{
      name: "unitString",
      standalone: true
    }]
  }], null, null);
})();

export {
  UnitStringPipe
};
//# sourceMappingURL=chunk-IFTH7MAK.js.map
