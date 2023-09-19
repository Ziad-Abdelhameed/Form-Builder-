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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IviewForm } from '../interfaces/viewForm';
import { Itable } from '../interfaces/table';
import { TableService } from '../table.service';

declare var window: any;
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private createForm: CreateFormService,
    private tableService: TableService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  editFormId: any = -1;
  editFormSchema: IviewForm = {
    data: {
      id: 0,
      name: '',
      isDeleted: false,
      dateOfCreation: '',
      numberOfResponses: 0,
      subforms: [
        {
          id: 0,
          name: '',
          mainFormId: 0,
          size: 0,
          order: 0,
          formData: [
            {
              id: 0,
              subFormId: 0,
              fieldQuestion: '',
              isMandatory: true,
              size: 12,
              order: 0,
              fieldtype: 0,
              comboBoxItems: [],
            },
          ],
        },
      ],
    },
    message: '',
    errorList: [],
  };
  realSchema: any = {
    id: 0,
    name: '',
    isDeleted: false,
    dateOfCreation: '',
    numberOfResponses: 0,
    subforms: [
      {
        id: 0,
        name: '',
        mainFormId: 0,
        size: 0,
        order: 0,
        formData: [
          {
            id: 0,
            subFormId: 0,
            fieldQuestion: '',
            isMandatory: true,
            size: 0,
            order: 0,
            fieldtype: 0,
            comboBoxItems: [],
          },
        ],
      },
    ],
  };

  // comboBoxItems: null;
  // fieldQuestion: 'inputziad';
  // fieldtype: 2;
  // id: 55;
  // isMandatory: true;
  // order: 1;
  // size: 12;
  // subFormId: 43;

  returnSchema(schema: any) {
    this.realSchema = schema;

    console.log(this.realSchema);

    this.formBuilder.patchValue({
      formName: this.realSchema.name,
    });

    console.log(this.realSchema.subforms);
    for (let subform of this.realSchema.subforms) {
      var formData: any = [];
      for (let field of subform.formData) {
        var formDataOnly: any = {
          fieldQuestion: field.fieldQuestion,
          fieldType: field.fieldtype,
          comboBoxItems: field.comboBoxItems,
          size: field.size,
          isMandatory: field.isMandatory,
        };
        formData.push(formDataOnly);
      }
      this.dives.push({
        subFormName: subform.name,
        subFormWidth: Number((Number(subform.size) / 12) * 100),
        fields: formData,
      });
    }
    console.log(this.dives);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.editFormId = params.get('id');
    });

    if (this.editFormId != null) {
      console.log(this.editFormId);

      this.createForm.ViewForm(this.editFormId).subscribe((dta) => {
        this.editFormSchema = dta;
        this.returnSchema(this.editFormSchema.data);
      });
    }
    //
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
      fieldQuestion: this.comboBoxName.value,
      comboBoxItems: this.comboBoxItems.controls,
      fieldType: '14',
      isMandatory: true,
      size: 12,
      order: 0,
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

  orderList = [
    'Input',
    'Table',
    'Paragraph',
    'ComboBox',
    'H1',
    'H2',
    'H3',
    'H4',
  ].sort();

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
        var fieldQuestion = this.dives[index].fields[fieldId].fieldQuestion,
          size = 12;
        //
        if (this.dives[index].fields[fieldId].fieldType == '2') {
          isMandatory = this.dives[index].fields[fieldId].isMandatory;
          size = this.dives[index].fields[fieldId].size;
        }
        //
        else if (this.dives[index].fields[fieldId].fieldType == '14') {
        }
        //
        else if (this.dives[index].fields[fieldId].fieldType == '12') {
          var table = this.dives[index].fields[fieldId];
          var tableField: Itable = {
            tableName: table.tableName,
            mainformId: 0,
            columns: table.columns,
            rows: table.rows,
            fieldtype: '12',
            fieldTableType: 'checkBox',
            order: fieldId,
            subFormId: index,
          };
          this.tableService.createTable(tableField).subscribe((dta) => {});

          fieldQuestion = this.dives[index].fields[fieldId].tableName;
        }
        //
        //
        formData = {
          subFormId: fieldId,
          fieldtype: this.dives[index].fields[fieldId].fieldType,
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
        size: Number((Number(this.dives[index].subFormWidth) / 100) * 12),
        mainFormId: 0,
        formData: allSubFormData,
      };
      // console.log(allSubFormData);

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
    if (this.editFormId != null) {
      console.log('this.editFormId');

      console.log(this.editFormId);

      this.createForm.DeleteForm(this.editFormId).subscribe((dta) => {
        console.log('deleted from reactive');
        console.log(dta);
      });
      this.createForm.CreateForm(this.schema).subscribe((dta) => {
        console.log(dta);
        console.log('Edited');

        this.router.navigate(['viewAllForms']);
      });
    } else {
      this.createForm.CreateForm(this.schema).subscribe((data) => {
        console.log(data);
        this.router.navigate(['viewAllForms']);
      });
    }
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
    } else if (event.container.data[0] == 'ComboBox') {
      this.comboBoxItems.controls = [];
      this.comboBoxForm.patchValue({
        comboBoxName: '',
      });
      this.comboBoxPopup.show();
    } else {
      this.paragraphPopup.show();
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
          fieldQuestion: this.pText.value,
          fieldType: '5',
          isMandatory: true,
          size: 12,
          order: 0,
        });
        this.paragraph.patchValue({ pText: '' });
      } else if (this.newElement == 'H1') {
        this.dives[size - 1].fields.push({
          fieldQuestion: this.pText.value,
          fieldType: '7',
          isMandatory: true,
          size: 12,
          order: 0,
        });
        this.paragraph.patchValue({ pText: '' });
      } else if (this.newElement == 'H2') {
        this.dives[size - 1].fields.push({
          fieldQuestion: this.pText.value,
          fieldType: '8',
          isMandatory: true,
          size: 12,
          order: 0,
        });
        this.paragraph.patchValue({ pText: '' });
      } else if (this.newElement == 'H3') {
        this.dives[size - 1].fields.push({
          fieldQuestion: this.pText.value,
          fieldType: '9',
          isMandatory: true,
          size: 12,
          order: 0,
        });
        this.paragraph.patchValue({ pText: '' });
      } else if (this.newElement == 'H4') {
        this.dives[size - 1].fields.push({
          fieldQuestion: this.pText.value,
          fieldType: '10',
          isMandatory: true,
          size: 12,
          order: 0,
        });
        this.paragraph.patchValue({ pText: '' });
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
    fieldQuestion: ['input'],
    size: ['12'],
    isMandatory: [true],
  });

  formInput: any;
  dropDownMenu = ['text'];
  showen = false;
  editInputIndex: number = -1;
  editDivIndex: number = -1;

  public get typeInput(): any {
    return this.popupInput.get('typeInput');
  }

  public get fieldQuestion(): any {
    return this.popupInput.get('fieldQuestion');
  }
  public get size(): any {
    return this.popupInput.get('size');
  }
  public get isMandatory(): any {
    return this.popupInput.get('isMandatory');
  }

  input: any;
  onSubmit() {
    this.input = {
      typeInput: this.typeInput.value,
      fieldQuestion: this.fieldQuestion.value,
      size: this.size.value,
      isMandatory: this.isMandatory.value,
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
      fieldQuestion: 'input',
      size: '12',
      isMandatory: true,
    });
  }

  // End of popup of Input

  // paragraph
  fieldTypePara: any;
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
      this.dives[this.editDivIndex].fields[this.editParaIndex].fieldQuestion =
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
        fieldQuestion: this.pText.value,
        fieldType: '5',
        isMandatory: true,
        size: 12,
        order: 0,
      });
      this.paragraph.patchValue({ pText: '' });
    } else if (this.newElement == 'H1') {
      this.dives[this.subFormSelectId.value].fields.push({
        fieldQuestion: this.pText.value,
        fieldType: '7',
        isMandatory: true,
        size: 12,
        order: 0,
      });
      this.paragraph.patchValue({ pText: '' });
    } else if (this.newElement == 'H2') {
      this.dives[this.subFormSelectId.value].fields.push({
        fieldQuestion: this.pText.value,
        fieldType: '8',
        isMandatory: true,
        size: 12,
        order: 0,
      });
      this.paragraph.patchValue({ pText: '' });
    } else if (this.newElement == 'H3') {
      this.dives[this.subFormSelectId.value].fields.push({
        fieldQuestion: this.pText.value,
        fieldType: '9',
        isMandatory: true,
        size: 12,
        order: 0,
      });
      this.paragraph.patchValue({ pText: '' });
    } else if (this.newElement == 'H4') {
      this.dives[this.subFormSelectId.value].fields.push({
        fieldQuestion: this.pText.value,
        fieldType: '10',
        isMandatory: true,
        size: 12,
        order: 0,
      });
      this.paragraph.patchValue({ pText: '' });
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
    this.dives[divId].fields[fieldId].isMandatory = event.currentTarget.checked;
  }

  edit(divId: any, fieldId: any) {
    if (this.dives[divId].fields[fieldId].fieldType == '2') {
      var editInput = this.dives[divId].fields[fieldId];

      this.popupInput.patchValue({
        fieldQuestion: editInput.fieldQuestion,
        size: editInput.size,
        isMandatory: editInput.isMandatory,
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
    } else if (
      this.dives[divId].fields[fieldId].fieldType == '5' ||
      this.dives[divId].fields[fieldId].fieldType == '8' ||
      this.dives[divId].fields[fieldId].fieldType == '7' ||
      this.dives[divId].fields[fieldId].fieldType == '9' ||
      this.dives[divId].fields[fieldId].fieldType == '10'
    ) {
      this.paragraph.patchValue({
        pText: this.dives[divId].fields[fieldId].fieldQuestion,
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
        comboBoxName: cmBox.fieldQuestion,
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
