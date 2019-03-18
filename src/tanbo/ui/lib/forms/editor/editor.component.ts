import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import Quill from 'quill';
import { ImageResize } from 'quill-image-resize';
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
export class EditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('editor') editorRef: ElementRef;
  @Input() value: string = '';
  @Input() placeholder = '请输入内容！';
  @Input() name: string = '';
  @Input() forId: string = '';
  @Input() imageUploader: Observable<string>;
  @Output() uiChange = new EventEmitter<string>();

  private editor: Quill;
  private onChange: (value: any) => any;
  private onTouched: () => any;

  private sub: Subscription;

  ngAfterViewInit() {
    const emptyArr: string[] = [];
    const fonts = [
      'sans-serif', 'SimSun', 'SimHei', 'Microsoft-YaHei',
      'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman'
    ];
    const toolbarOptions = [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      // [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      // [{'direction': 'rtl'}],                         // text direction

      [{'color': emptyArr}, {'background': emptyArr}],          // dropdown with defaults from theme
      [{'font': fonts}],
      [{'align': emptyArr}],
      // ['image', 'video'],
      ['link', 'image'],
      ['clean']                                         // remove formatting button
    ];
    const Font = Quill.import('formats/font');
    Font.whitelist = fonts;

    Quill.register(Font, true);
    Quill.register('modules/imageResize', ImageResize, true);
    this.editor = new Quill(this.editorRef.nativeElement, {
      modules: {
        imageResize: {},
        toolbar: toolbarOptions
      },
      placeholder: this.placeholder,
      theme: 'snow'  // or 'bubble'
    });

    if (this.imageUploader) {
      const toolbar = this.editor.getModule('toolbar');
      toolbar.addHandler('image', () => {
        if (this.sub) {
          this.sub.unsubscribe();
        }
        this.sub = this.imageUploader.subscribe(imgUrl => {
          const range = this.editor.getSelection();
          if (range) {
            this.editor.insertEmbed(range.index, 'image', imgUrl);
          }
        });
      });
    }

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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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