export interface PickerCell {
  label: string;
  value: string | number;
  children?: PickerCell[];
}