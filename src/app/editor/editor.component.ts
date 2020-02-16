import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateParserService } from '../template-parser.service';
import { MatSnackBar } from '@angular/material';

import jsPDF from 'jspdf';
import FileSaver from 'file-saver';
import { toBlob } from 'html-to-image';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  height: number;
  width: number;

  @ViewChild('openFile', { static: false })
  openFile: ElementRef<HTMLInputElement>;

  @ViewChild('tempImgHolder', {static: true })
  tempImgHolder: ElementRef<HTMLDivElement>;

  editorForm: FormGroup;

  quillModules: {} = {
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    },
    blotFormatter: {}
  };

  constructor(private templateParserService: TemplateParserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  onHeightChanged(event: number) {
    this.height = event;
  }

  onWidthChanged(event: number) {
    this.width = event;
  }

  onEditorContentChanged(event: any) {
    const text = event.text;
    if (text !== null || text !== '') {
      this.templateParserService.addTemplateKeys(text);
    }
  }

  setSize() {
    return {
      margin: 'auto',
      marginTop: '10px',
      borderTop: '1px solid #ccc',
      height: this.height + 'px',
      width: this.width + 'px',
    };
  }

  openHTML() {
    const el: HTMLInputElement = this.openFile.nativeElement;
    el.click();
  }

  readHTML(event: any) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];

      if (file.type !== 'text/html') {
        this.snackBar.open('Invalid file format.', 'Close', {
          duration: 2000
        });
        return;
      }

      const reader = new FileReader();
      const editor = this.editorForm.controls.editor;

      reader.onload = (e: any) => {
        editor.setValue(e.target.result);
      };

      reader.readAsText(file);
    }
  }

  saveHTML() {
    const editor = this.editorForm.controls.editor;

    const blob = new Blob([editor.value], { type: 'text/html;charset="utf-8' });
    FileSaver.saveAs(blob, 'quill-save.html');
  }

  exportPDF() {
    const editor = this.editorForm.controls.editor;

    const jspdf = new jsPDF({ orientation: 'portrait' });
    jspdf.fromHTML(editor.value, 15, 15);
    jspdf.save('quill-ps.pdf');
  }

  exportImage() {
    const editor = this.editorForm.controls.editor;
    this.tempImgHolder.nativeElement.innerHTML = editor.value;

    toBlob(this.tempImgHolder.nativeElement).then(blob => {
      FileSaver.saveAs(blob, 'quill-image.png');
    });

    this.tempImgHolder.nativeElement.innerHTML = '';
  }
}
