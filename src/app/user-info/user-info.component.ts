import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { InputDataService } from '../input-data.service';
import { Input } from '@angular/core';

declare var window: any;
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  //
  ngOnInit(): void {
    this.comboBoxPopup = new window.bootstrap.Modal(
      document.getElementById('comboBoxPopup')
    );
    this.comboBoxPopup.show();
  }
  //

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
  addOption() {
    if (this.editComboBoxIndex == -1) {
      this.comboBoxItems.controls.push(this.option);
    } else {
      this.comboBoxItems.controls.splice(
        this.editComboBoxIndex,
        1,
        this.option
      );
      this.editComboBoxIndex = -1;
    }
    this.option = '';
  }
  optionName(event: any) {
    this.option = event.currentTarget.value;
  }
  createComboBox() {
    this.comboBoxPopup.hide();
    this.comboBox = {
      comboBoxName: this.comboBoxName.value,
      comboBoxItems: this.comboBoxItems.controls,
      fieldType: '14',
    };
  }
  editOption(i: any) {
    this.option = this.comboBoxItems.controls[i];
    this.editComboBoxIndex = i;
  }
  deleteOption(i: any) {
    this.comboBoxItems.controls.splice(i, i + 1);
  }
}

// $('#exampleModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })
