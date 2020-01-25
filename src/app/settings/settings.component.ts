import { Component, ViewChild, Input } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { TemplateParserService } from '../template-parser.service';

export interface UserData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  csvVisible: boolean = false;

  private dataSource: string[];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private templateParserService: TemplateParserService) {
    this.templateParserService.subscribe({
      next(result: string[]) {
        if (result !== null) {
          this.dataSource = result;

          if (this.dataSource && this.dataSource.length) {
            this.csvVisible = true;
          } else {
            this.csvVisible = false;
          }
        }
      },
      error(error: Error) {
        console.log(error.message);
      }
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
