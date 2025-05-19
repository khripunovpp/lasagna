export const mediaMobMax = (
  breakpoint: string | number = 600
) => {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
}
