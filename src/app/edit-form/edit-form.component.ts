import { Component, OnInit } from '@angular/core';
import { CreateFormService } from '../create-form.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ischema } from '../interfaces/schema';
import { IsubForm } from '../interfaces/subForm';
import { IviewForm } from '../interfaces/viewForm';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  constructor(
    private service: CreateFormService,
    private activated: ActivatedRoute
  ) {}

  schemas: IviewForm = {
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
              size: 0,
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
  //
  formId: any;
  realSchema: any;
  //
  ngOnInit(): void {
    this.activated.paramMap.subscribe((params: ParamMap) => {
      this.formId = params.get('formId');
    });
    this.service.ViewForm(this.formId).subscribe((dta) => {
      this.schemas = dta;
      this.schemaForm(this.schemas);
    });
  }

  schemaForm(schema: any) {
    this.realSchema = schema.data;
    console.log(this.realSchema);
  }
}
