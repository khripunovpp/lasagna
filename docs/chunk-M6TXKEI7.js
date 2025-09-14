// src/app/shared/factories/entity-labels/product.label.factory.ts
var productLabelFactory = (product) => {
  if (!product) {
    return "unknown";
  }
  let string = product.name;
  if (!product.brand && !product.source) {
    return string;
  }
  if (product.brand) {
    string += ` - ${product.brand}`;
  }
  if (product.source) {
    string += ` (${product.source})`;
  }
  return string;
};

export {
  productLabelFactory
};
//# sourceMappingURL=chunk-M6TXKEI7.js.map
