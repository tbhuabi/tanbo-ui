export interface ElementPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function getPosition(element: HTMLElement): ElementPosition {
  let left = 0;
  let top = 0;
  let el: any = element;
  while (el.offsetParent) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent;
  }

  return {
    left,
    top,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}