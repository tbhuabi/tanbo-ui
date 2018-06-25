import { InjectionToken } from '@angular/core';

// tree-expand 控件展开时的 icon
export const UI_TREE_CHECKED_ICON = new InjectionToken<string>('UI_TREE_CHECKED_ICON');
// tree-expand 控件收起时的 icon
export const UI_TREE_UNCHECKED_ICON = new InjectionToken<string>('UI_TREE_UNCHECKED_ICON');

export const UI_TREE_DEPTH = new InjectionToken<number>('UI_TREE_DEPTH');
export const UI_TREE_OFFSET = new InjectionToken<number>('UI_TREE_OFFSET');