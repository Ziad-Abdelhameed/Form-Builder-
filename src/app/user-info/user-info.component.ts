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
import { FormBuilder, Validators } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private inputService: InputDataService
  ) {}
  // @Input() isOkay: boolean = false;
  formInputBuilder = this.fb.group({
    typeInput: ['text'],
    nameInput: ['input1'],
    size: [12],
  });

  inputs: any = [];

  formModal: any;
  dropDownMenu = ['text', 'password', 'number'];
  showen = false;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    this.formModal.show();

    this.inputService.formInputData = this.formInputBuilder.controls;
    // this.formInputBuilder.reset();
    // this.inputs = this.inputService.getInputs();
  }

  public get typeInput(): any {
    return this.formInputBuilder.get('typeInput');
  }

  public get nameInput(): any {
    return this.formInputBuilder.get('nameInput');
  }

  // show popup
  // @Output() formModalFromInput = new EventEmitter<any>();

  // ngAfterViewInit(): void {
  // }

  whichType(type: any) {
    this.typeInput.value = type;
    this.showen = !this.showen;
    this.inputService.formInputData = this.formInputBuilder.controls;
  }

  appendIntoInputs(input: any) {}

  onSubmit() {
    this.formModal.hide();
    // this.inputService.isSubmit = true;
    this.inputService.formInputData = this.formInputBuilder.controls;
    // console.log(this.formInputBuilder.controls);

    // this.formModalFromInput.emit(this.formInputBuilder);
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
