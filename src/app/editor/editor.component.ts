import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateParserService } from '../template-parser.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editorForm: FormGroup;

  editorStyle = { height: '300px', width: '500px' };

  constructor(private templateParserService: TemplateParserService) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  editorContentChanged(event: any) {
    const text = event.text;
    if (text !== null || text !== '') {
      this.templateParserService.addTemplateKeys(text);
    }
  }
}
