import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateParserService } from '../template-parser.service';
import { MatSnackBar } from '@angular/material';

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

      reader.readAsDataURL(file);
    }
  }

  saveHTML() {

  }

  restoreHTML() {

  }
}
