import { Component, Inject, Input, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  private action: string;
  private columns: string[];
  private localData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.rowData) {
      this.localData = data.rowData;
    } else {
      this.localData = [];
    }

    this.columns = data.columns;
    this.action = data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
