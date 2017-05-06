export interface InputType {
    checked: boolean;
    disabled: boolean;
    readonly: boolean;
    value?: number | string;
    checkedIcon?: string;
    uncheckedIcon?: string;
    min?: number | string;
    max?: number | string;
}