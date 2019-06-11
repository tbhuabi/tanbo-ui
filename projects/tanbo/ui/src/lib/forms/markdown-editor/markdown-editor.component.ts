import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as CodeMirror from 'codemirror';
import * as hljs from 'highlight.js';
import * as marked from 'marked';

import 'codemirror/mode/markdown/markdown.js';

const md = marked.setOptions({
  highlight (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (e) {
        console.log(e);
      }
    }
    return '';
  },
  breaks: true
});

@Component({
  selector: 'ui-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MarkdownEditorComponent,
    multi: true
  }]
})
export class MarkdownEditorComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('editor', {static: true}) textarea: ElementRef;
  @Input() value = '';
  @Input() name: string;
  @Input() mode: string;
  @Input() forId: string;
  @Output() uiChange = new EventEmitter<string>();

  display = 'split'; // code|view

  displayHtml = '';

  private onChange: (_: any) => any;
  private onTouched: () => any;

  private cmInstance: CodeMirror.Editor;
  private cmDoc: CodeMirror.Doc;

  ngAfterViewInit() {
    this.cmInstance = CodeMirror.fromTextArea(this.textarea.nativeElement, {
      mode: this.mode || 'markdown',
      lineNumbers: true,
      lineWrapping: true,
      cursorHeight: 1
    });
    if (this.value !== null && this.value !== undefined) {
      this.displayHtml = md(this.value + '');
      this.cmInstance.setValue(this.value + '');
    }
    this.cmDoc = this.cmInstance.getDoc();
    this.cmInstance.on('change', (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList) => {
      if (change.origin === 'setValue') {
        return;
      }
      let value = instance.getValue();
      this.value = value;
      if (this.onChange) {
        this.onChange(value);
      }

      this.uiChange.emit(value);
      if (this.display !== 'code') {
        this.displayHtml = md(value);
      }
    });
    this.cmInstance.on('blur', () => {
      if (this.onTouched) {
        this.onTouched();
      }
    });
  }

  setDisplayState(state: string) {
    this.display = state;
    this.displayHtml = md(this.value);
  }

  setBold() {
    let selection = this.cmDoc.getSelection();
    this.cmDoc.replaceSelection('**' + selection + '**');
    this.cmInstance.focus();
    let cursor = this.cmDoc.getCursor();
    this.cmDoc.setCursor({
      ch: cursor.ch - 2,
      line: cursor.line
    });
  }

  setItalic() {
    let selection = this.cmDoc.getSelection();
    this.cmDoc.replaceSelection('*' + selection + '*');
    this.cmInstance.focus();
    let cursor = this.cmDoc.getCursor();
    this.cmDoc.setCursor({
      ch: cursor.ch - 1,
      line: cursor.line
    });
  }

  setHeader() {
    this.setLineSelection();
    const selection = this.cmDoc.getSelection();

    this.cmDoc.replaceSelection(selection.replace(/^#*(\s)?/gm, (str: string, $1?: string) => {
      let result = [];
      let len = str.length;
      if ($1) {
        len = len - $1.length;
      }
      len = len === 6 ? 0 : len + 1;
      for (let i = 0; i < len; i++) {
        result.push('#');
      }

      return result.length ? result.join('') + ($1 || ' ') : '';
    }));
    this.cmInstance.focus();
  }

  setDeleteLine() {
    let selection = this.cmDoc.getSelection();
    this.cmDoc.replaceSelection('~~' + selection + '~~');
    this.cmInstance.focus();
    let cursor = this.cmDoc.getCursor();
    this.cmDoc.setCursor({
      ch: cursor.ch - 1,
      line: cursor.line
    });
  }

  setBlockQuote() {
    this.setLineSelection();
    const selection = this.cmDoc.getSelection();
    this.cmDoc.replaceSelection(selection.replace(/^(>\s)?/gm, (str: string, $1?: string) => {
      return $1 ? '' : '> ';
    }));
    this.cmInstance.focus();
  }

  setOrderedList() {
    this.setLineSelection();
    const selection = this.cmDoc.getSelection();
    let index = 0;

    this.cmDoc.replaceSelection(selection.replace(/^/gm, () => {
      index++;
      return index + '. ';
    }));
    this.cmInstance.focus();
  }

  setUnorderedList() {
    this.setLineSelection();
    const selection = this.cmDoc.getSelection();
    this.cmDoc.replaceSelection(selection.replace(/^/gm, () => {
      return '- ';
    }));
    this.cmInstance.focus();
  }

  insertImage() {
    this.cmDoc.replaceSelection('![](http://image/url)');
    let cursor = this.cmDoc.getCursor();
    this.cmDoc.setCursor({
      ch: cursor.ch - 1,
      line: cursor.line
    });
    this.cmInstance.focus();
  }

  setLink() {
    const selection = this.cmDoc.getSelection();
    this.cmDoc.replaceSelection('[' + selection + '](http://target/url)');

    let cursor = this.cmDoc.getCursor();
    this.cmDoc.setCursor({
      ch: cursor.ch - 1,
      line: cursor.line
    });
    this.cmInstance.focus();
  }

  insertTable() {
    let template = `

| index   | key    | value |
| ------  | -----  | ----- |
| 1       | name   | John  |
| 2       | age    | 12    |
| 3       | sex    | man   |
`;
    this.cmDoc.replaceSelection(template);
    this.cmInstance.focus();
  }

  writeValue(value: any) {
    this.value = value;
    if (this.cmInstance && value !== null && value !== undefined) {
      this.cmInstance.setValue(value + '');
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  focus() {
    this.cmInstance.focus();
  }

  private setLineSelection() {
    const rawSelection = this.cmDoc.listSelections()[0];
    let cursors = [rawSelection.anchor, rawSelection.head].sort((a, b) => {
      return a.line - b.line;
    });
    this.cmDoc.setSelection({
      line: cursors[0].line,
      ch: 0
    }, {
      line: cursors[1].line,
      ch: cursors[1].ch
    });
  }
}
