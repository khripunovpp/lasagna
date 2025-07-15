export const focusNextElement = (container: HTMLElement | null) => {
  if (!container) return;

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter(el => el.offsetParent !== null);

  console.log('Focusable:', focusable);
  console.log('Active:', document.activeElement);

  if (focusable.length === 0) {
    container.focus(); // fallback
    return;
  }

  const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);

  const nextIndex =
    currentIndex >= 0 && currentIndex < focusable.length - 1
      ? currentIndex + 1
      : 0;

  console.log('Next:', focusable[nextIndex]);

  focusable[nextIndex].focus();
};
