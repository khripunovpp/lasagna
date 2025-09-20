if (!Array.prototype.toSorted) {
  Object.defineProperty(Array.prototype, 'toSorted', {
    value: function <T>(this: T[], compareFn?: (a: T, b: T) => number): T[] {
      return Array.from(this)
        .sort(compareFn);
    },
    writable: true,
    configurable: true,
  });
}
