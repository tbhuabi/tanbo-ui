import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() value: string = '';
  @Input() placeholder = '请输入内容！';
  @Input() name: string = '';
  @Input() forId: string = '';
  @Output() uiChange = new EventEmitter<string>();

  private editor: Quill;
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
    if (this.value !== null && this.value !== undefined) {
      this.writeValue(this.value + '');
    }
    // source: api/user triggered this change
    // args: delta, oldDelta, source
    this.editor.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        const html = this.editor.root.innerHTML;
        this.value = html;
        if (this.onChange) {
          this.onChange(html);
        }
        if (this.onTouched) {
          this.onTouched();
        }
        this.uiChange.emit(html);
      }
    });
  }

  focus() {
    this.editor.focus();
  }

  writeValue(_val: any) {
    if (this.editor && _val !== null && _val !== undefined) {
      this.value = _val;
      this.editor.root.innerHTML = _val;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}