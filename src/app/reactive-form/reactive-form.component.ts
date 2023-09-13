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
  constructor(private fb: FormBuilder, private inputData: InputDataService) {}
  formBuilder = this.fb.group({
    formName: ['', Validators.required],
    userName: ['', Validators.required],
    nationalId: ['', Validators.required],
    elements: this.fb.array([]),
  });

  public get elements() {
    return this.formBuilder.get('elements') as FormArray;
  }

  inputs: any = [];
  objects = [
    { Label: `<label for="">Hello</label>` },
    { Checkbox: `<input type="checkbox"/>` },
  ];

  orderList = ['Input', 'Table', 'Sub Form', 'Combo Box'].sort();

  // [x: string]: any;
  // orderList2 = {
  //   item1: {
  //     question: 'some question 1',
  //   },
  //   item2: {
  //     question: 'some question 2',
  //   },
  //   item3: {
  //     question: 'some question 3',
  //   },
  // };

  event: any;
  CdkDragDrop: any;

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

    this.formInput.show();
  }
  //

  // sub form
  addToDivId: any = -1;
  onDropSubElement(event: CdkDragDrop<any>, i: any) {
    this.onDropOne(event);
    this.addToDivId = i;
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
  // div Sub Form
  dives: any = [];

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

  ngOnInit(): void {
    this.formInput = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
  }

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
  //   this.dives[this.addToDivId].components.push(this.popupInput);
  //   this.addToDivId = -1;
  // } else if (this.addToDivId == -1) {
  //   if (this.editInputIndex != -1 && this.inputs.length) {
  //     this.inputs[this.editInputIndex] = this.popupInput.value;
  //     this.editInputIndex = -1;
  //   } else if (this.editInputIndex == -1) {
  //     this.inputs.push(this.popupInput.value);
  //   }
  // }

  onSubmit() {
    if (this.addToDivId == -1) {
      this.dives.push({ subFormData: this.popupInput, components: [] });
    } else if (this.addToDivId != -1) {
      this.dives[this.addToDivId].components.push(this.popupInput);
      this.addToDivId = -1;
    }

    this.popupInput.patchValue({
      typeInput: 'text',
      nameInput: 'input',
      sizeInput: '12',
      required: true,
    });
    this.formInput.hide();
  }
  isRequired(event: any, index: number) {
    this.dives[index].subFormData.required = event.currentTarget.checked;
  }

  editInput(index: any) {
    this.popupInput.setValue(this.inputs[index]);

    this.editInputIndex = index;
    this.formInput.show();
  }

  deleteInput(index: any) {
    this.inputs.splice(index, index + 1);
  }
  // End of popup of Input
}

// show popup
// @Output() formModalFromInput = new EventEmitter<any>();

// for (let item of this.elements) {
//   innerHtml += `<div><input type="text" placeholder="Enter Your ${item}" /></div>`;
// }
