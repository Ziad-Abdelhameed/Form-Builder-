import { Component, ViewChild } from '@angular/core';
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
import { InputDataService } from '../input-data.service';
import { KeyValuePipe } from '@angular/common';

declare var window: any;
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent {
  constructor(private fb: FormBuilder) {}

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
  }
  formBuilder = this.fb.group({
    formName: ['', Validators.required],
    elements: this.fb.array([]),
  });

  public get elements() {
    return this.formBuilder.get('elements') as FormArray;
  }

  inputs: any = [];

  orderList = ['Input', 'Table', 'Sub Form', 'Combo Box'].sort();

  event: any;
  CdkDragDrop: any;

  newElement: any = '';
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
    // console.log(this.dives);
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

  // div Sub Form

  dives: any = [];
  addToDivId: any = -1;
  onDropSubElement(event: CdkDragDrop<any>, i: any) {
    this.addToDivId = i;
    console.log(i);
    this.onDropOne(event);
  }

  submitSubForm() {
    this.subFormPopUp.hide();
    this.dives.push({
      divName: this.subFormName?.value,
      divWidth: this.subFormWidth?.value,
      fields: [],
    });

    var size = this.dives.length;

    this.dives[size - 1].fields.push(this.input);
    console.log(this.dives[size - 1]);

    this.input = '';

    this.subFormData.patchValue({
      subFormName: '',
      subFormWidth: '100',
      fields: [],
    });

    // this.addNewElementPopUp.show();
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
  dropDownMenu = [
    'text',
    'password',
    'number',
    'email',
    'tel',
    'checkbox',
    'submit',
    'reset',
  ];
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
  public get requiredInput(): any {
    return this.popupInput.get('required');
  }

  // if (this.addToDivId != -1) {
  //   this.dives[this.addToDivId].fields.push({});
  //   this.addToDivId = -1;
  // } else if (this.addToDivId == -1) {
  //   if (this.editInputIndex != -1 && this.inputs.length) {
  //     this.inputs[this.editInputIndex] = this.popupInput.value;
  //     this.editInputIndex = -1;
  //   } else if (this.editInputIndex == -1) {
  //     this.inputs.push(this.popupInput.value);
  //   }
  // }
  input: any;
  onSubmit() {
    this.input = {
      typeInput: this.typeInput.value,
      nameInput: this.nameInput.value,
      sizeInput: this.sizeInput.value,
      requiredInput: this.requiredInput.value,
    };
    console.log(this.input);

    this.formInput.hide();
    if (this.editDivIndex != -1 && this.editInputIndex != -1) {
      this.dives[this.editDivIndex].fields[this.editInputIndex] = this.input;
      this.input = '';
      console.log(this.dives[this.editDivIndex].fields);
      this.editDivIndex = -1;
      this.editInputIndex = -1;

      console.log('ediitt');
    } else this.addNewElementPopUp.show();

    this.popupInput.patchValue({
      typeInput: 'text',
      nameInput: 'input',
      sizeInput: '12',
      required: true,
    });
  }

  //
  isRequired(event: any, index: number, fieldId: any) {
    // this.dives[index].subFormData.required = event.currentTarget.checked;
  }

  // editInput(index: any) {
  //   this.popupInput.setValue(this.inputs[index]);

  //   this.editInputIndex = index;
  //   this.formInput.show();
  // }

  editInput(divId: any, fieldId: any) {
    var editInput = this.dives[divId].fields[fieldId];
    console.log(editInput);

    this.popupInput.patchValue({
      typeInput: editInput.typeInput,
      nameInput: editInput.nameInput,
      sizeInput: editInput.sizeInput,
      required: editInput.requiredInput,
    });

    this.editInputIndex = fieldId;
    this.editDivIndex = divId;
    this.formInput.show();
  }

  deleteInput(divId: any, fieldId: any) {
    // this.inputs.splice(index, index + 1);
  }
  // End of popup of Input

  // Add New Element PopUp
  addNewElementPopUp: any;
  addNewElementForm = this.fb.group({
    subFormSelect: ['-1'],
  });

  public get subFormSelect(): any {
    return this.addNewElementForm.get('subFormSelect');
  }
  addNewSubForm() {
    this.addNewElementPopUp.hide();
    this.subFormPopUp.show();
  }
  addNewSubElement() {
    this.addNewElementPopUp.hide();

    if (this.newElement == 'Input') {
      this.dives[this.subFormSelect.value].fields.push(this.input);
      this.newElement = '';
    }
    this.addNewElementForm.patchValue({
      subFormSelect: '-1',
    });
  }

  // End of Add New Element PopUp
}

// show popup
// @Output() formModalFromInput = new EventEmitter<any>();

// for (let item of this.elements) {
//   innerHtml += `<div><input type="text" placeholder="Enter Your ${item}" /></div>`;
// }
