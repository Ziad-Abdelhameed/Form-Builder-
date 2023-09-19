import { Component, OnInit } from '@angular/core';
import { Ischema } from '../interfaces/schema';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CreateFormService } from '../create-form.service';
import { IsubForm } from '../interfaces/subForm';
import { IviewForm } from '../interfaces/viewForm';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss'],
})
export class ViewFormComponent implements OnInit {
  constructor(
    private activated: ActivatedRoute,
    private service: CreateFormService
  ) {}

  //
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

  formWithID: any;
  formId: any;
  realSchema: any;

  //
  ngOnInit(): void {
    this.activated.paramMap.subscribe((params: ParamMap) => {
      this.formId = params.get('formId');
    });
    //
    this.formWithID = this.service.ViewForm(this.formId).subscribe((dta) => {
      this.schemas = dta;
      // realSchema
      this.schemaForm(this.schemas.data);
      // console.log(this.schemas);
    });
  }

  schemaForm(schema: any) {
    this.realSchema = schema;
    console.log(this.realSchema.subforms);
  }

  public get formName(): any {
    return this.realSchema.name;
  }
  public get subforms(): any {
    return this.realSchema.subforms;
  }
}

// var subforms: any = [];
// //
// this.schemas.push({ name: this.formId, subForms: [] });
// var size: number = this.schemas.length;
// //
// subforms = this.service.ViewAllSubForms(this.formId).subscribe((dta) => {
//   subforms = dta;
//   subforms = subforms.data;
//   //
//   for (let j = 0; j < subforms.length; j++) {
//     var subformsFile: IsubForm;

//     var formData: any = [];
//     formData = this.service
//       .ViewAllFormData(subforms[j].id)
//       .subscribe((dta) => {
//         formData = dta;
//         formData = formData.data;
//         //
//         subformsFile = {
//           formData: formData,
//           name: subforms[j].name,
//           mainFormId: this.formId,
//           size: subforms[j].size,
//           order: subforms[j].order,
//         };
//         //
//         this.schemas[size - 1].subForms.push(subformsFile);
//         //
//       });
//   }
// });
