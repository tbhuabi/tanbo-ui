import { Tool } from './tool';

export class Toolbar {
  private tools: Tool[] = [];

  constructor(private hostView: HTMLElement) {
  }

  push(tools: Tool | Tool[]) {
    if (Array.isArray(tools)) {
      tools.forEach(item => this.tools.push(item));
    } else {
      this.tools.push(tools);
    }
  }
}