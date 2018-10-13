import { Observable } from 'rxjs';

export interface PickerCell {
  label: string;
  value: string | number;
  children?: PickerCell[];
}

export interface PickerDataProvider {
  getChildren(cell: PickerCell): null | PickerCell[] | Promise<null | PickerCell[]> | Observable<null | PickerCell[]>;
}