import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'ui-editor',
  templateUrl: './editor.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: EditorComponent,
    multi: true
  }]
})
export class EditorComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('editor') editorRef: ElementRef;

  @Input() placeholder = '请输入内容！';

  private editor: Quill;

  private _value: string = '';
  private onChange: (value: any) => any;
  private onTouched: () => any;

  ngAfterViewInit() {
    this.editor = new Quill(this.editorRef.nativeElement, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: this.placeholder,
      theme: 'snow'  // or 'bubble'
    });
    // this.editor.keyboard.addBinding()
  }

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}