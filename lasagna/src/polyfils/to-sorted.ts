if (!Array.prototype.toSorted) {
  Object.defineProperty(Array.prototype, 'toSorted', {
    value: function<T>(this: T[], compareFn?: (a: T, b: T) => number): T[] {
      if (typeof (window as any).structuredClone === 'function') {
        return (window as any).structuredClone(this).sort(compareFn);
      }
      return Array.from(this).sort(compareFn);
    },
    writable: true,
    configurable: true,
  });
}
