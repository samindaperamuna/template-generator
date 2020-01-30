import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateParserService } from '../template-parser.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  height: number;
  width: number;

  editorForm: FormGroup;

  constructor(private templateParserService: TemplateParserService) { }

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
}
