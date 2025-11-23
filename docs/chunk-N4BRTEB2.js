// src/app/shared/service/types/sorting.types.ts
var SortResult = class {
  groups;
  constructor(groups) {
    this.groups = groups;
  }
  get length() {
    return this.groups.reduce((acc, group) => acc + group.items.length, 0);
  }
};

export {
  SortResult
};
//# sourceMappingURL=chunk-N4BRTEB2.js.map
