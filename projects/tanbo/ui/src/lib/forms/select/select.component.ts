import {
  ChangeDetectorRef,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild,
  Output,
  Inject,
  QueryList, SimpleChanges, OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BACKSPACE, DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DropdownInputComponent } from '../../dropdown/dropdown-input/dropdown-input.component';
import { UI_DROPDOWN_ARROW_CLASSNAME } from '../../dropdown/help';
import { OptionComponent } from '../option/option.component';
import { SelectService } from './select.service';
import { GourdBoolean, GourdNumber } from '../utils';

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
export class SelectComponent implements ControlValueAccessor, AfterContentInit, OnDestroy, AfterViewInit, OnChanges {
  @ContentChildren(OptionComponent)
  options: QueryList<OptionComponent>;
  @ViewChild('dropdownInput', {static: true}) dropdownInput: DropdownInputComponent;
  @Input() size = '';
  @Input() forId: string;
  @Input() name: string;
  @Input() placeholder = '';
  @Input() @GourdBoolean() multiple = false;
  @Input() @GourdNumber(0) selectedIndex = 0;
  @Input() arrowIconClassName = '';

  @Input() @GourdBoolean()
  disabled = false;
  @Input() @GourdBoolean()
  readonly = false;

  @Output() uiChange = new EventEmitter<string | string[]>();
  focus = false;
  open = false;
  text = '';

  private value: any = '';
  private onChange: (_: any) => any;
  private onTouched: () => any;
  private subs: Array<Subscription> = [];

  private selectedOption: OptionComponent | OptionComponent[];
  private temporaryOption: OptionComponent;
  private isWrite = false;

  static getTextByElement(element: HTMLElement): string {
    if (element) {
      return element.innerText.replace(/^[\s\n\t\r]+|[\s\n\t\r]+$/g, '');
    }
    return '';
  }

  constructor(@Inject(UI_DROPDOWN_ARROW_CLASSNAME) arrowIcon: string,
              private selectService: SelectService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.arrowIconClassName = arrowIcon;
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      if (key === 'multiple') {
        this.selectService.canMultiple(this[key]);
      }
    });
  }

  ngAfterContentInit() {
    if (this.isWrite) {
      this.updateByNgModel();
    } else {
      this.updateBySelf();
    }
    this.subs.push(this.selectService.onChecked.subscribe((option: OptionComponent) => {
      this.dropdownInput.focusIn();
      if (this.multiple) {
        if (!Array.isArray(this.selectedOption)) {
          if (this.selectedOption) {
            this.selectedOption = [this.selectedOption];
          } else {
            this.selectedOption = [];
          }
        }
        const i = this.selectedOption.indexOf(option);
        if (i === -1) {
          this.selectedOption.push(option);
          option.selected = true;
          this.text = this.selectedOption.map(op => SelectComponent.getTextByElement(op.nativeElement)).join('/');
          this.selectedIndex = this.options.toArray().indexOf(option);
        } else {
          const unselectedOption = this.selectedOption.splice(i, 1)[0];
          unselectedOption.selected = false;
        }
        this.text = this.selectedOption.map(op => SelectComponent.getTextByElement(op.nativeElement)).join('/');
        const value = this.selectedOption.map(op => op.value || SelectComponent.getTextByElement(op.nativeElement));
        if (this.onChange) {
          this.onChange(value);
        }
        this.uiChange.emit(value);
      } else {
        this.open = false;
        this.options.forEach((op: OptionComponent, index: number) => {
          if (op === option) {
            if (op !== this.selectedOption) {
              this.selectedOption = op;
              op.selected = true;
              this.text = SelectComponent.getTextByElement(option.nativeElement);
              this.value = option.value || this.text;
              this.selectedIndex = index;
              if (this.onChange) {
                this.onChange(this.value);
              }
              this.uiChange.emit(this.value);
            }
          } else {
            op.selected = false;
          }
        });
      }
    }));
    this.subs.push(this.options.changes.pipe(delay(0)).subscribe(() => {
      this.updateByNgModel();
    }));
  }

  ngAfterViewInit() {
    if (this.selectedOption) {
      this.text = Array.isArray(this.selectedOption) ?
        this.selectedOption.map(op => SelectComponent.getTextByElement(op.nativeElement)).join('/') :
        SelectComponent.getTextByElement(this.selectedOption.nativeElement);
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }

  keyDown(ev: KeyboardEvent) {

    function findNext(startOption: OptionComponent,
                      selectedOption: OptionComponent,
                      options: OptionComponent[],
                      offset: number): OptionComponent {
      if (!options.length) {
        return null;
      }
      let index = options.indexOf(selectedOption);
      index += offset;
      if (index < 0) {
        index = options.length - 1;
      } else if (index >= options.length) {
        index = 0;
      }

      const nextOption = options[index];
      if (nextOption === startOption) {
        return nextOption;
      }
      if (nextOption.disabled) {
        return findNext(startOption, nextOption, options, offset);
      }
      return nextOption;
    }

    const keyCode = ev.keyCode;
    if (this.open) {
      const options = this.options.toArray();
      if (keyCode === DOWN_ARROW || keyCode === UP_ARROW) {
        const lastFocusOption = Array.isArray(this.selectedOption) ?
          this.selectedOption[this.selectedOption.length - 1] :
          this.selectedOption;
        const nextOption = findNext(
          lastFocusOption,
          this.temporaryOption || lastFocusOption,
          options,
          keyCode === DOWN_ARROW ? 1 : -1);
        options.forEach(op => {
          op.focus = op === nextOption;
          if (op.focus) {
            this.temporaryOption = op;
          }
        });
        ev.preventDefault();
        return false;
      } else if (keyCode === ENTER && this.temporaryOption) {
        this.temporaryOption.click();
        this.temporaryOption.focus = false;
        this.temporaryOption = null;
        return;
      }
    }
    if (keyCode === ENTER) {
      this.toggle();
    } else if (keyCode === BACKSPACE) {
      if (this.temporaryOption) {
        this.temporaryOption.focus = false;
        this.temporaryOption = null;
      }
      this.reset();
    }
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
    if (this.temporaryOption) {
      this.temporaryOption.focus = false;
      this.temporaryOption = null;
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

  reset() {
    this.value = '';
    this.text = '';
    this.selectedIndex = -1;
    if (Array.isArray(this.selectedOption)) {
      this.selectedOption.forEach(item => item.selected = false);
    } else {
      this.selectedOption.selected = false;
    }
    this.selectedOption = null;
    if (this.onChange) {
      this.onChange('');
    }
    this.uiChange.emit('');
    this.dropdownInput.focusIn();
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
    if (this.multiple) {
      const selectedOption: OptionComponent[] = [];
      this.options.forEach((item: OptionComponent, index: number) => {
        item.selected = false;
        if (Array.isArray(this.value)) {
          const flag = this.value.map(v => {
            const vv = item.value || SelectComponent.getTextByElement(item.nativeElement);
            return vv === v || `${vv}` === v || vv === `${v}`
          }).includes(true);
          if (flag) {
            item.selected = true;
            selectedOption.push(item);
            this.selectedIndex = index;
          }
        }
      });
      if (selectedOption.length) {
        this.text = selectedOption.map(op => SelectComponent.getTextByElement(op.nativeElement)).join('/');
        this.selectedOption = selectedOption;
      } else {
        this.selectedIndex = -1;
        this.text = '';
        this.selectedOption = null;
      }
    } else {
      let selectedOption: OptionComponent;
      this.options.forEach((item: OptionComponent, index: number) => {
        item.selected = false;
        const vv = item.value || SelectComponent.getTextByElement(item.nativeElement);
        if (vv === this.value || `${vv}` === this.value || vv === `${this.value}`) {
          selectedOption = item;
          this.selectedIndex = index;
        }
      });
      if (selectedOption) {
        this.text = SelectComponent.getTextByElement(selectedOption.nativeElement);
        selectedOption.selected = true;
        this.selectedOption = selectedOption;
      } else {
        this.selectedIndex = -1;
        this.text = '';
        this.selectedOption = null;
      }
    }
  }

  private updateBySelf() {
    if (this.multiple) {
      let defaultOption: OptionComponent[] = [];
      this.options.forEach((option: OptionComponent, index: number) => {
        if (option.selected) {
          defaultOption.push(option);
          this.selectedIndex = index;
        }
      });
      const o = this.options.toArray()[this.selectedIndex];
      if (!defaultOption.length && o) {
        defaultOption = [o];
      }
      if (!defaultOption.length && this.options.first) {
        defaultOption = [this.options.first];
        this.selectedIndex = 0;
      }
      if (defaultOption.length) {
        this.value = defaultOption.map(op => op.value || SelectComponent.getTextByElement(op.nativeElement));
        setTimeout(() => {
          if (!this.isWrite) {
            defaultOption.forEach(op => op.selected = true);
          }
        });
        this.selectedOption = defaultOption;
      }
    } else {
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
}
