import { AfterViewInit, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { LocalStorageService } from '../local-storage.service';
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
export class SettingsComponent implements OnInit, AfterViewInit {

  csvVisible = false;

  private dataSource: string[];

  @Output()
  public heightChanged = new EventEmitter<number>();

  @Output()
  public widthChanged = new EventEmitter<number>();

  private heightInput = new FormControl();
  private widthInput = new FormControl();

  constructor(
    public dialog: MatDialog,
    private templateParserService: TemplateParserService,
    private localStorageService: LocalStorageService) {

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

  ngOnInit() {
    const height = this.localStorageService.getHeight();
    const width = this.localStorageService.getWidth();

    this.heightInput.setValue(height);
    this.widthInput.setValue(width);

    this.heightChanged.emit(height);
    this.widthChanged.emit(width);
  }

  ngAfterViewInit() {
    // Save the width and height.

    this.heightInput.valueChanges.subscribe((change: number) => {
      this.heightChanged.emit(change);
      this.localStorageService.setHeight(change);
    });

    this.widthInput.valueChanges.subscribe((change: number) => {
      this.widthChanged.emit(change);
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
