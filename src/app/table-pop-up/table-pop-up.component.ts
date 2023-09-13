import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
declare var window: any;
@Component({
  selector: 'app-table-pop-up',
  templateUrl: './table-pop-up.component.html',
  styleUrls: ['./table-pop-up.component.scss'],
})
export class TablePopUpComponent implements OnInit {
  tablePopUp: any;

  constructor(private fb: FormBuilder) {}

  formTablePopUp = this.fb.group({
    tableName: [''],
    columns: this.fb.array([]),
    rows: this.fb.array([]),
    fieldType: ['radio'],
  });

  rowName: any = '';
  colName: any = '';

  tables: any = [];

  fieldTypes = ['checkbox'];

  public get tableName(): any {
    return this.formTablePopUp.get('tableName');
  }

  public get columns() {
    return this.formTablePopUp.get('columns') as FormArray;
  }
  public get rows() {
    return this.formTablePopUp.get('rows') as FormArray;
  }
  public get fieldType(): any {
    return this.formTablePopUp.get('fieldType');
  }

  valuechange(event: any, arrayName: any) {
    if (arrayName == 'row') this.rowName = event.currentTarget.value;
    else this.colName = event.currentTarget.value;
  }

  //                         row1     columns
  // array Data of size rows -> {angular , Level 1 :true ,Level 2 :false }

  ngOnInit(): void {
    this.tablePopUp = new window.bootstrap.Modal(
      document.getElementById('tablePopUp')
    );

    this.tablePopUp.show();
  }

  editRowIndex: number = -1;
  editColIndex: number = -1;
  addRow() {
    if (this.rowName != '' && this.editRowIndex == -1) {
      this.rows.controls.push(this.rowName);
    } else if (this.editRowIndex != -1 && this.rowName != '') {
      this.rows.controls.splice(this.editRowIndex, 0, this.rowName);
      this.editRowIndex = -1;
    }
    // console.log(this.rows.controls);
    this.rowName = '';
  }
  deleteRow(i: any) {
    this.rows.controls.splice(i, i + 1);
  }
  editRow(i: any) {
    this.rowName = this.rows.controls[i];
    this.editRowIndex = i;
    this.deleteRow(i);
  }

  deleteItem(i: any, arrayName: any) {
    if (arrayName == 'row') {
      this.rows.controls.splice(i, i + 1);
    } else if (arrayName == 'col') {
      this.columns.controls.splice(i, i + 1);
    }
  }

  editItem(i: any, arrayName: any) {
    if (arrayName == 'row') {
      this.editRowIndex = i;
      this.rowName = this.rows.controls[i];
    } else if (arrayName == 'col') {
      this.editColIndex = i;
      this.colName = this.columns.controls[i];
    }
    this.deleteItem(i, arrayName);
  }

  addItem(arrayName: any) {
    if (arrayName == 'row') {
      if (this.rowName != '' && this.editRowIndex == -1) {
        this.rows.controls.push(this.rowName);
      } else if (this.rowName != '' && this.editRowIndex != -1) {
        this.rows.controls.splice(this.editRowIndex, 0, this.rowName);
        this.editRowIndex = -1;
      }

      this.rowName = '';
    } else if (arrayName == 'col') {
      if (this.editColIndex == -1 && this.colName != '') {
        this.columns.controls.push(this.colName);
      } else if (this.colName != '' && this.editColIndex != -1) {
        this.columns.controls.splice(this.editColIndex, 0, this.colName);
        this.editColIndex = -1;
      }
      this.colName = '';
    }
  }
  submitTable() {
    this.tables.push(this.formTablePopUp.controls);
    console.log(this.tables);

    this.tablePopUp.hide();
  }
}
