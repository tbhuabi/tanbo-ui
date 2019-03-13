export enum ToolType {
  Select,
  button
}

export abstract class Tool {
  abstract type: ToolType;
  abstract render(): HTMLElement;
  abstract handler(): void;
}