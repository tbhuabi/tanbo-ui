import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { createEditor, Editor, EditorOptions, OutputContent } from '@tanbo/textbus';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-editor',
  templateUrl: './editor.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: EditorComponent,
    multi: true
  }]
})
export class EditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('editor', {static: true}) editorRef: ElementRef;
  @Input() value = '';
  @Input() placeholder = '请输入内容！';
  @Input() name = '';
  @Input() forId = '';
  @Input() editorOptions: EditorOptions = {};
  @Output() uiChange = new EventEmitter<string>();
  @Output() uiContentsChange = new EventEmitter<OutputContent<string>>();

  editor: Editor;
  private onChange: (value: any) => any;
  private onTouched: () => any;

  private sub: Subscription;

  ngOnInit() {
    this.editor = createEditor(this.editorRef.nativeElement, {
      ...this.editorOptions,
      contents: this.value !== undefined && this.value !== null ? this.value + '' : ''
    });

    this.sub = this.editor.onChange.subscribe(() => {
      const content = this.editor.getContents();
      this.uiContentsChange.emit(content);
      this.value = content.content;
      this.uiChange.emit(this.value);
      if (this.onChange) {
        this.onChange(this.value);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  focus() {
    // this.editor.focus();
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (obj !== undefined && obj !== null) {
      this.editor.setContents(obj + '');
    } else {
      this.editor.setContents('');
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
