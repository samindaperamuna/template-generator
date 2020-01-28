import { Component, ViewChild, Input, OnChanges, SimpleChange, SimpleChanges, AfterViewInit } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { TemplateParserService } from '../template-parser.service';
import { LocalStorageService } from '../local-storage.service';
import { FormControl } from '@angular/forms';

export interface UserData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {

  csvVisible = false;

  private dataSource: string[];

  private heightInput: FormControl;
  private widthInput: FormControl;

  constructor(
    public dialog: MatDialog,
    private templateParserService: TemplateParserService,
    private localStorageService: LocalStorageService) {

    this.heightInput = new FormControl();
    this.widthInput = new FormControl();

    this.heightInput.setValue(localStorageService.getHeight());
    this.widthInput.setValue(localStorageService.getWidth());

    // Subscribe to the template parse service.
    this.templateParserService.subscribe(
      (result: string[]) => {
        if (result !== null) {
          this.dataSource = result;

          if (this.dataSource && this.dataSource.length) {
            this.csvVisible = true;
          } else {
            this.csvVisible = false;
          }
        }
      },
      (error: Error) => {
        console.log(error.message);
      }
    );
  }

  ngAfterViewInit() {
    // Save the width and height.

    this.heightInput.valueChanges.subscribe((change: number) => {
      this.localStorageService.setHeight(change);
    });

    this.widthInput.valueChanges.subscribe((change: number) => {
      this.localStorageService.setWidth(change);
    });
  }

  openDialog(action: any, obj: any) {
    // obj.action = action;

    // const dialogRef = this.dialog.open(DialogBoxComponent, {
    //   width: '250px',
    //   data: obj
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result.event === 'Add') {
    //     this.addRowData(result.data);
    //   } else if (result.event === 'Update') {
    //     this.updateRowData(result.data);
    //   } else if (result.event === 'Delete') {
    //     this.deleteRowData(result.data);
    //   }
    // });
  }

  addRowData(rowObj: any) {
    // const d = new Date();
    // this.dataSource.push({
    //   id: d.getTime(),
    //   name: rowObj.name
    // });
    // this.table.renderRows();
  }

  updateRowData(rowObj: any) {
    // this.dataSource = this.dataSource.filter((value, key) => {
    //   if (value.id === rowObj.id) {
    //     value.name = rowObj.name;
    //   }
    //   return true;
    // });
  }

  deleteRowData(rowObj: any) {
    // this.dataSource = this.dataSource.filter((value, key) => {
    //   return value.id !== rowObj.id;
    // });
  }
}
