import {
  ChangeDetectorRef,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Inject,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { OptionComponent } from '../option/option.component';
import { SelectService } from './select.service';
import { UI_SELECT_ARROW_CLASSNAME } from '../help';
import { inputAttrToBoolean } from '../help';

@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true
  }, SelectService
  ]
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit, OnDestroy, AfterViewInit {
  @ContentChildren(OptionComponent)
  options: QueryList<OptionComponent>;
  @Input()
  size: string = '';
  @Input()
  forId: string = '';
  @Input()
  name: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  selectedIndex: number = 0;
  @Input()
  arrowIconClassName: string = '';

  @Input()
  set disabled(isDisabled: any) {
    this._disabled = inputAttrToBoolean(isDisabled);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(isReadonly: any) {
    this._readonly = inputAttrToBoolean(isReadonly);
  }

  get readonly() {
    return this._readonly;
  }

  @Output()
  uiChange = new EventEmitter<string>();
  focus: boolean = false;
  open: boolean = false;
  text: string = '';
  private _disabled: boolean;
  private _readonly: boolean;

  private value: string = '';
  private onChange: (_: any) => any;
  private onTouched: (_: any) => any;
  private subs: Array<Subscription> = [];

  private selectedOption: OptionComponent;
  private isWrite: boolean = false;

  static getTextByElement(element: HTMLElement): string {
    if (element) {
      return element.innerText.replace(/^[\s\n\t\r]+|[\s\n\t\r]+$/g, '');
    }
    return '';
  }

  constructor(@Inject(UI_SELECT_ARROW_CLASSNAME) arrowIcon: string,
              private selectService: SelectService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.arrowIconClassName = arrowIcon;
  }

  ngAfterContentInit() {
    if (!this.isWrite) {
      this.updateBySelf();
    }
    this.subs.push(this.selectService.onChecked.subscribe((option: OptionComponent) => {
      this.focus = true;
      this.open = false;
      this.options.forEach((op: OptionComponent, index: number) => {
        if (op === option) {
          this.selectedOption = op;
          op.selected = true;
          this.value = option.value;
          this.text = SelectComponent.getTextByElement(option.nativeElement);
          this.selectedIndex = index;
          if (this.onChange) {
            this.onChange(this.value);
          }
          if (this.onTouched) {
            this.onTouched(this.value);
          }
          this.uiChange.emit(this.value);
        } else {
          op.selected = false;
        }
      });
    }));
    this.subs.push(this.options.changes.pipe(delay(0)).subscribe(() => {
      this.updateByNgModel();
    }));
  }

  ngAfterViewInit() {
    if (this.selectedOption) {
      this.text = SelectComponent.getTextByElement(this.selectedOption.nativeElement);
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    this.focus = true;
    if (this.readonly) {
      return;
    }
    this.open = !this.open;
  }

  escape() {
    this.focus = false;
    this.open = false;
  }

  reset() {
    this.value = '';
    this.text = '';
    this.selectedIndex = -1;
    this.selectedOption.selected = false;
    this.selectedOption = null;
    if (this.onChange) {
      this.onChange('');
    }
    this.uiChange.emit('');
  }

  writeValue(value: any) {
    this.isWrite = true;
    this.value = value;
    if (this.options) {
      this.updateByNgModel();
    } else {
      this.text = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private updateByNgModel() {
    let selectedOption: OptionComponent;
    this.options.forEach((item: OptionComponent, index: number) => {
      item.selected = false;
      if (item.value === this.value || `${item.value}` === this.value || item.value === `${this.value}`) {
        selectedOption = item;
        this.selectedIndex = index;
      }
    });
    if (selectedOption) {
      this.text = SelectComponent.getTextByElement(selectedOption.nativeElement);
      selectedOption.selected = true;
    } else {
      this.selectedIndex = -1;
      this.text = '';
    }
  }

  private updateBySelf() {
    let defaultOption: OptionComponent;
    this.options.forEach((option: OptionComponent, index: number) => {
      if (option.selected) {
        defaultOption = option;
        this.selectedIndex = index;
      }
    });
    if (!defaultOption) {
      defaultOption = this.options.toArray()[this.selectedIndex];
    }
    if (!defaultOption) {
      defaultOption = this.options.first;
      this.selectedIndex = 0;
    }
    if (defaultOption) {
      this.value = defaultOption.value;
      setTimeout(() => {
        if (!this.isWrite) {
          defaultOption.selected = true;
        }
      });
      this.selectedOption = defaultOption;
    }
  }
}