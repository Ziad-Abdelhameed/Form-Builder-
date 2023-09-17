import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Ischema } from '../interfaces/schema';
import { IsubForm } from '../interfaces/subForm';
import { IformData } from '../interfaces/formData';
import { CreateFormService } from '../create-form.service';

declare var window: any;
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private createForm: CreateFormService) {}

  ngOnInit(): void {
    this.formInput = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    this.subFormPopUp = new window.bootstrap.Modal(
      document.getElementById('subFormPopUp')
    );
    this.addNewElementPopUp = new window.bootstrap.Modal(
      document.getElementById('addNewElementPopUp')
    );
    this.tablePopUp = new window.bootstrap.Modal(
      document.getElementById('tablePopUp')
    );
    this.paragraphPopup = new window.bootstrap.Modal(
      document.getElementById('paragraphPopup')
    );
    this.comboBoxPopup = new window.bootstrap.Modal(
      document.getElementById('comboBoxPopup')
    );
  }

  // comboBox

  comboBoxPopup: any;
  editComboBoxIndex = -1;
  comboBoxForm = this.fb.group({
    comboBoxName: [''],
    comboBoxItems: this.fb.array([]),
  });

  //
  public get comboBoxName(): any {
    return this.comboBoxForm.get('comboBoxName');
  }
  public get comboBoxItems(): any {
    return this.comboBoxForm.get('comboBoxItems') as FormArray;
  }

  //
  option: any = '';
  comboBox: any = '';
  editOptionIndex: any = -1;
  addOption() {
    if (this.editOptionIndex == -1) {
      this.comboBoxItems.controls.push(this.option);
    } else if (this.editOptionIndex != -1) {
      this.comboBoxItems.controls.splice(this.editOptionIndex, 1, this.option);
      this.editOptionIndex = -1;
    }
    this.option = '';
  }
  optionName(event: any) {
    this.option = event.currentTarget.value;
  }

  //
  optionChoiceSubForm(event: any, i: any, fieldId: any) {
    this.dives[i].fields[fieldId].comboBoxSelected = event.currentTarget.value;
    // console.log(this.dives[i].fields[fieldId]);
  }
  createComboBox() {
    this.comboBoxPopup.hide();
    this.comboBox = {
      comboBoxName: this.comboBoxName.value,
      comboBoxItems: this.comboBoxItems.controls,
      fieldType: '14',
      comboBoxSelected: this.comboBoxItems.controls[0],
    };

    this.comboBoxItems.controls = [];
    this.comboBoxForm.patchValue({
      comboBoxName: '',
    });

    if (this.editComboBoxIndex != -1 && this.editDivIndex != -1) {
      // editting
      this.dives[this.editDivIndex].fields[this.editComboBoxIndex] =
        this.comboBox;

      this.comboBox = '';
      this.editDivIndex = -1;
      this.editComboBoxIndex = -1;
    } else this.addNewElementPopUp.show();
  }
  editOption(i: any) {
    this.option = this.comboBoxItems.controls[i];
    this.editOptionIndex = i;
  }
  deleteOption(i: any) {
    this.comboBoxItems.controls.splice(i, i + 1);
  }

  // end comboBox
  // input
  formBuilder = this.fb.group({
    formName: ['', Validators.required],
    elements: this.fb.array([]),
  });

  public get elements(): any {
    return this.formBuilder.get('elements') as FormArray;
  }
  public get formName(): any {
    return this.formBuilder.get('formName');
  }

  orderList = ['Input', 'Table', 'Paragraph', 'ComboBox'].sort();

  event: any;
  CdkDragDrop: any;

  newElement: any = '';
  //

  schema: Ischema;
  submitForm() {
    var subForms = [];
    for (let index = 0; index < this.dives.length; index++) {
      var subForm: IsubForm;
      var allSubFormData = [];

      for (
        let fieldId = 0;
        fieldId < this.dives[index].fields.length;
        fieldId++
      ) {
        var formData: IformData;
        var isMandatory = true;
        var fieldQuestion,
          size = 12;
        //
        if (this.dives[index].fields[fieldId].fieldType == '2') {
          isMandatory = this.dives[index].fields[fieldId].required;
          fieldQuestion = this.dives[index].fields[fieldId].nameInput;
          size = this.dives[index].fields[fieldId].sizeInput;
        }
        //
        else if (this.dives[index].fields[fieldId].fieldType == '14') {
          fieldQuestion = this.dives[index].fields[fieldId].comboBoxName;
        }
        //
        else if (this.dives[index].fields[fieldId].fieldType == '12') {
          fieldQuestion = this.dives[index].fields[fieldId].tableName;
        }
        //
        else if (this.dives[index].fields[fieldId].fieldType == '5') {
          fieldQuestion = this.dives[index].fields[fieldId].pText;
        }

        //
        formData = {
          subFormId: fieldId,
          fieldType: this.dives[index].fields[fieldId].fieldType,
          isMandatory: isMandatory,
          fieldQuestion: String(fieldQuestion),
          order: fieldId + 1,
          size: size,
          comboBoxItems: this.dives[index].fields[fieldId].comboBoxItems,
        };
        allSubFormData.push(formData);
      }
      //
      subForm = {
        name: String(this.dives[index].subFormName),
        order: index + 1,
        size: 12,
        mainFormId: 0,
        formData: allSubFormData,
      };
      //
      subForms.push(subForm);
    }

    //
    var schemaSubmit: Ischema = {
      name: this.formName.value,
      subForms: subForms,
    };

    //
    this.schema = schemaSubmit;

    console.log(this.schema);
    this.createForm.CreateForm(this.schema).subscribe((data) => {
      console.log(data);
    });
  }
  //
  // insert new element in (Add New Element)
  onDropOne(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    for (let item of event.container.data) {
      if (!this.orderList.includes(item)) {
        this.orderList.unshift(item);
        break;
      }
    }
    // this.subFormPopUp.show();
    this.newElement = event.container.data[0];
    if (event.container.data[0] == 'Input') this.formInput.show();
    else if (event.container.data[0] == 'Table') {
      this.tablePopUp.show();
    } else if (event.container.data[0] == 'Paragraph') {
      this.paragraphPopup.show();
    } else if (event.container.data[0] == 'ComboBox') {
      this.comboBoxItems.controls = [];
      this.comboBoxForm.patchValue({
        comboBoxName: '',
      });
      this.comboBoxPopup.show();
    }
  }

  // to reorder elements
  onDropTwo(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // sub form

  subFormPopUp: any;
  subFormData = this.fb.group({
    subFormName: [''],
    subFormWidth: ['100'],
    fields: this.fb.array([]),
  });

  public get subFormName(): any {
    return this.subFormData.get('subFormName');
  }

  public get subFormWidth(): any {
    return this.subFormData.get('subFormWidth');
  }
  public get fields(): any {
    return this.subFormData.get('fields') as FormArray;
  }

  //  new Sub Form

  dives: any = [];

  submitSubForm() {
    this.subFormPopUp.hide();
    if (this.editDivIndex == -1) {
      this.dives.push({
        subFormName: this.subFormName?.value,
        subFormWidth: this.subFormWidth?.value,
        fields: [],
      });

      var size = this.dives.length;

      //

      if (this.newElement == 'Input') {
        this.dives[size - 1].fields.push(this.input);
        this.input = '';
      } else if (this.newElement == 'Table') {
        this.dives[size - 1].fields.push(this.table);

        this.table = '';
      } else if (this.newElement == 'Paragraph') {
        this.dives[size - 1].fields.push({
          pText: this.pText.value,
          fieldType: '5',
        });
        this.paragraph.reset();
      } else if (this.newElement == 'ComboBox') {
        this.dives[size - 1].fields.push(this.comboBox);
        this.comboBox = '';
        this.comboBoxItems.controls = [];
        this.comboBoxForm.patchValue({
          comboBoxName: '',
        });
      }

      //
    } else if (this.editDivIndex != -1) {
      this.dives[this.editDivIndex].subFormName = this.subFormName.value;
      this.dives[this.editDivIndex].subFormWidth = this.subFormWidth.value;
      this.editDivIndex = -1;
    }

    //
    this.subFormData.patchValue({
      subFormName: '',
      subFormWidth: '100',
      fields: [],
    });
    console.log(this.dives);
  }
  // End new Sub Form

  // for editing Div

  doubleClickEdit(divId: any) {
    this.editDivIndex = divId;
    // console.log('welcome' + ' ' + divId);
    var div = this.dives[divId];
    this.subFormData.patchValue({
      subFormName: div.subFormName,
      subFormWidth: div.subFormWidth,
    });
    this.subFormPopUp.show();
  }
  // End sub Form

  //POPUP for Input

  popupInput = this.fb.group({
    typeInput: ['text'],
    nameInput: ['input'],
    sizeInput: ['12'],
    required: [true],
  });

  formInput: any;
  dropDownMenu = ['text', 'password', 'number', 'email', 'tel', 'checkbox'];
  showen = false;
  editInputIndex: number = -1;
  editDivIndex: number = -1;

  public get typeInput(): any {
    return this.popupInput.get('typeInput');
  }

  public get nameInput(): any {
    return this.popupInput.get('nameInput');
  }
  public get sizeInput(): any {
    return this.popupInput.get('sizeInput');
  }
  public get required(): any {
    return this.popupInput.get('required');
  }

  input: any;
  onSubmit() {
    this.input = {
      typeInput: this.typeInput.value,
      nameInput: this.nameInput.value,
      sizeInput: this.sizeInput.value,
      required: this.required.value,
      fieldType: '2',
    };

    this.formInput.hide();
    if (this.editDivIndex != -1 && this.editInputIndex != -1) {
      this.dives[this.editDivIndex].fields[this.editInputIndex] = this.input;
      this.input = '';
      this.editDivIndex = -1;
      this.editInputIndex = -1;
    } else this.addNewElementPopUp.show();

    this.popupInput.patchValue({
      typeInput: 'text',
      nameInput: 'input',
      sizeInput: '12',
      required: true,
    });
  }

  // End of popup of Input

  // paragraph
  editParaIndex: any = -1;
  paragraphPopup: any;
  paragraph = this.fb.group({
    pText: [''],
  });

  public get pText(): any {
    return this.paragraph.get('pText');
  }
  addPara() {
    this.paragraphPopup.hide();
    if (this.editParaIndex != -1 && this.editDivIndex != -1) {
      this.dives[this.editDivIndex].fields[this.editParaIndex].pText =
        this.pText.value;
      this.editParaIndex = -1;
      this.editDivIndex = -1;
      this.paragraph.patchValue({ pText: '' });
    } else {
      this.addNewElementPopUp.show();
    }
  }
  // end paragraph

  // Add New Element PopUp
  addNewElementPopUp: any;
  addNewElementForm = this.fb.group({
    subFormSelectId: ['0'],
  });

  public get subFormSelectId(): any {
    return this.addNewElementForm.get('subFormSelectId');
  }

  addNewSubForm() {
    this.addNewElementPopUp.hide();
    this.subFormPopUp.show();
  }

  addNewSubElement() {
    this.addNewElementPopUp.hide();

    if (this.newElement == 'Input') {
      this.dives[this.subFormSelectId.value].fields.push(this.input);
    } else if (this.newElement == 'Table') {
      this.dives[this.subFormSelectId.value].fields.push(this.table);
    } else if (this.newElement == 'Paragraph') {
      this.dives[this.subFormSelectId.value].fields.push({
        pText: this.pText.value,
        fieldType: '5',
      });
      this.paragraph.reset();
    } else if (this.newElement == 'ComboBox') {
      this.dives[this.subFormSelectId.value].fields.push(this.comboBox);
      this.comboBoxItems.controls = [];
      this.comboBoxForm.patchValue({
        comboBoxName: '',
      });
    }

    //
    this.addNewElementForm.patchValue({
      subFormSelectId: '0',
    });
  }

  // End of Add New Element PopUp

  // Table popup

  tablePopUp: any;
  formTablePopUp = this.fb.group({
    tableName: [''],
    columns: this.fb.array([]),
    rows: this.fb.array([]),
    fieldTableType: ['checkbox'],
  });

  rowName: any = '';
  colName: any = '';

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
  public get fieldTableType(): any {
    return this.formTablePopUp.get('fieldTableType');
  }

  valuechange(event: any, arrayName: any) {
    if (arrayName == 'row') this.rowName = event.currentTarget.value;
    else this.colName = event.currentTarget.value;
  }

  editRowIndex: number = -1;
  editColIndex: number = -1;

  deleteItem(i: any, arrayName: any) {
    if (arrayName == 'row') {
      this.rows.controls.splice(i, 1);
    } else if (arrayName == 'col') {
      this.columns.controls.splice(i, 1);
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
  table: any;
  editTableIndex: any = -1;
  submitTable() {
    this.table = {
      tableName: this.tableName.value,
      fieldTableType: this.fieldTableType.value,
      columns: this.columns.controls,
      rows: this.rows.controls,
      fieldType: '12',
    };
    this.columns.controls = [];
    this.rows.controls = [];
    this.formTablePopUp.patchValue({
      tableName: '',
      fieldTableType: 'checkbox',
    });
    this.tablePopUp.hide();

    // change

    if (this.editTableIndex != -1) {
      this.dives[this.editDivIndex].fields[this.editTableIndex] = this.table;
      this.editTableIndex = -1;
      this.editDivIndex = -1;
      this.table = '';
    } else {
      this.addNewElementPopUp.show();
    }
  }
  // End Table popup

  // Common Functions
  deletee(divId: any, fieldId: any) {
    if (this.dives[divId].fields.length == 1) {
      this.dives.splice(divId, divId + 1);
    } else this.dives[divId].fields.splice(fieldId, fieldId + 1);
  }
  isRequired(event: any, divId: any, fieldId: any) {
    this.dives[divId].fields[fieldId].required = event.currentTarget.checked;
  }

  edit(divId: any, fieldId: any) {
    if (this.dives[divId].fields[fieldId].fieldType == '2') {
      var editInput = this.dives[divId].fields[fieldId];

      this.popupInput.setValue({
        typeInput: editInput.typeInput,
        nameInput: editInput.nameInput,
        sizeInput: editInput.sizeInput,
        required: editInput.required,
      });

      this.formInput.show();
      this.editInputIndex = fieldId;
    } else if (this.dives[divId].fields[fieldId].fieldType == '12') {
      var editTable = this.dives[divId].fields[fieldId];
      //

      this.columns.controls = editTable.columns;
      this.rows.controls = editTable.rows;
      this.formTablePopUp.patchValue({
        tableName: editTable.tableName,
        fieldTableType: editTable.fieldTableType,
      });
      console.log(this.formTablePopUp.controls);

      //
      this.tablePopUp.show();
      this.editTableIndex = fieldId;

      //
    } else if (this.dives[divId].fields[fieldId].fieldType == '5') {
      this.paragraph.patchValue({
        pText: this.dives[divId].fields[fieldId].pText,
      });
      //
      this.editParaIndex = fieldId;
      this.paragraphPopup.show();
      //
      //
    } else if (this.dives[divId].fields[fieldId].fieldType == '14') {
      var cmBox = this.dives[divId].fields[fieldId];

      this.comboBoxItems.controls = cmBox.comboBoxItems;
      this.comboBoxForm.patchValue({
        comboBoxName: cmBox.comboBoxName,
      });
      //
      this.editComboBoxIndex = fieldId;
      this.comboBoxPopup.show();
    }
    this.editDivIndex = divId;
  }
}

// show popup
// @Output() formModalFromInput = new EventEmitter<any>();

// for (let item of this.elements) {
//   innerHtml += `<div><input type="text" placeholder="Enter Your ${item}" /></div>`;
// }
