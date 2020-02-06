import { AfterViewInit, Component, Output, EventEmitter, OnInit, ViewChild, HostListener, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { LocalStorageService } from '../local-storage.service';
import { TemplateParserService } from '../template-parser.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  private csvVisible = false;

  @ViewChild('csvTable', { static: false })
  private csvTable: MatTable<any>;

  private dataSource = [];

  private columnNames: string[];
  private columnsToDisplay: string[];

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
          this.columnNames = result;

          this.columnsToDisplay = [...result];
          this.columnsToDisplay.unshift('index');
          this.columnsToDisplay.push('action');

          if (this.columnNames && this.columnNames.length) {
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

  openDialog(action: any, columns: string[], @Optional() rowData: any, @Optional() index: number) {
    const obj = { action, columns, rowData, index };
    obj.action = action;
    obj.columns = columns;

    if (rowData) {
      obj.rowData = rowData;

      if (index !== undefined) {
        obj.rowData.index = index;
      }
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '275px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj: any) {
    this.dataSource.push(rowObj);
    this.csvTable.renderRows();
  }

  deleteRowData(rowObj: any) {
    this.dataSource = this.dataSource.filter(({ }, key) => {
      return key !== rowObj.index;
    });
  }
}
