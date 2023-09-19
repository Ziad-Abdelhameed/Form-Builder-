import { Component, OnInit } from '@angular/core';
import { CreateFormService } from '../create-form.service';
import { IviewAllForms } from '../interfaces/viewAllForms';
import { Ischema } from '../interfaces/schema';
import { IsubForm } from '../interfaces/subForm';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-view-all-forms',
  templateUrl: './view-all-forms.component.html',
  styleUrls: ['./view-all-forms.component.scss'],
})
export class ViewAllFormsComponent implements OnInit {
  constructor(
    private service: CreateFormService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  lastFormCreated: any;

  form = this.fb.group({
    formId: [, Validators.required],
  });

  public get formId(): any {
    return this.form.get('formId');
  }

  viewForm() {
    this.router.navigate(['/viewForm', this.formId.value]);
  }
  editForm() {
    this.router.navigate(['/createForm', this.formId.value]);
  }
  deleteForm() {
    this.service.DeleteForm(this.formId.value).subscribe((dta) => {
      console.log('deleted');
      this.forms = this.service.ViewAllForms().subscribe((dta) => {
        this.forms = dta;
        console.log(this.forms);

        this.lastFormCreated = this.forms.data[this.forms.data.length - 1].id;
        this.form.patchValue({ formId: this.lastFormCreated });
      });

      // console.log(dta);
    });
  }
  forms: any = [];
  index: any;

  goNext() {
    if (this.forms.data[this.index + 1].id != null)
      this.lastFormCreated = this.forms.data[++this.index].id;

    console.log(this.lastFormCreated);

    this.form.patchValue({ formId: this.lastFormCreated });
  }

  goBack() {
    if (this.forms.data[this.index - 1].id != null)
      this.lastFormCreated = this.forms.data[--this.index].id;

    console.log(this.lastFormCreated);

    this.form.patchValue({ formId: this.lastFormCreated });
  }
  ngOnInit(): void {
    this.forms = this.service.ViewAllForms().subscribe((dta) => {
      this.forms = dta;
      this.index = this.forms.data.length - 1;

      this.lastFormCreated = this.forms.data[this.forms.data.length - 1].id;

      this.form.patchValue({ formId: this.lastFormCreated });
    });
  }
}
