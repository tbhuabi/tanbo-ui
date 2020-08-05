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
import { createEditor, Editor } from '@tanbo/textbus';
import { Observable, Subscription } from 'rxjs';

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
  @Input() uploader: (type: string) => (string | Promise<string> | Observable<string>);
  @Output() uiChange = new EventEmitter<string>();

  styleSheet: string;

  private editor: Editor;
  private onChange: (value: any) => any;
  private onTouched: () => any;

  private sub: Subscription;

  ngOnInit() {
    this.editor = createEditor(this.editorRef.nativeElement, {
      uploader: this.uploader,
      contents: this.value !== undefined && this.value !== null ? this.value + '' : ''
    });

    this.editor.onChange.subscribe(() => {
      const content = this.editor.getContents();
      this.styleSheet = content.styleSheets.join('');
      this.value = content.html;
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
