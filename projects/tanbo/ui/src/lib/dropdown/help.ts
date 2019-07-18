import { ElementRef, InjectionToken } from '@angular/core';

// 下拉框右边箭头的 className 注入 key
export const UI_DROPDOWN_ARROW_CLASSNAME = new InjectionToken<string>('UI_DROPDOWN_ARROW_CLASSNAME');

export abstract class DropdownRenderer {
  abstract renderDropdown(ref: ElementRef): () => void;
}

