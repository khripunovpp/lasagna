export const mediaMobMax = (
  breakpoint: string | number = 768
) => {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
}
