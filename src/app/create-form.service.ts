import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ischema } from './interfaces/schema';
import { IviewAllForms } from './interfaces/viewAllForms';
import { IsubForm } from './interfaces/subForm';
import { IformData } from './interfaces/formData';
import { IreturnSubForm } from './interfaces/returnSubForm';
import { IviewForm } from './interfaces/viewForm';

@Injectable({
  providedIn: 'root',
})
export class CreateFormService {
  _url1ViewAllForms =
    'https://formbuilderapi.azurewebsites.net/api/MainForm/ViewAllForms';
  //
  _url1ViewForm =
    'https://formbuilderapi.azurewebsites.net/api/MainForm/ViewForm';
  _urlCreateForm =
    'https://formbuilderapi.azurewebsites.net/api/MainForm/CreateForm';
  _urlSubForms =
    'https://formbuilderapi.azurewebsites.net/api/SubForm/GetAllSubForms';

  _urlFormData =
    'https://formbuilderapi.azurewebsites.net/api/FormData/GetAllFormData';

  //

  _urlEditFormName =
    'https://formbuilderapi.azurewebsites.net/api/MainForm/EditFormName';

  //
  _urlDeleteForm =
    'https://formbuilderapi.azurewebsites.net/api/MainForm/DeleteForm';

  constructor(private http: HttpClient) {}

  //
  DeleteForm(formId: any): Observable<IviewAllForms> {
    return this.http.delete<IviewAllForms>(
      this._urlDeleteForm + '?id=' + formId
    );
  }
  //
  lastFormIdEdited: any = -1;
  CreateForm(data: any): Observable<Ischema> {
    // this.lastFormIdEdited = formId;
    return this.http.post<Ischema>(this._urlCreateForm, data);
  }

  ViewAllForms(): Observable<IviewAllForms[]> {
    return this.http.get<IviewAllForms[]>(this._url1ViewAllForms);
  }

  //
  ViewForm(formId: any): Observable<IviewForm> {
    return this.http.get<IviewForm>(this._url1ViewForm + '?id=' + formId);
  }

  ViewAllSubForms(formId: any): Observable<IreturnSubForm[]> {
    return this.http.get<IreturnSubForm[]>(this._urlSubForms + '?id=' + formId);
  }

  ViewAllFormData(subFormId: number): Observable<IformData[]> {
    // console.log(subFormId);

    return this.http.get<IformData[]>(this._urlFormData + subFormId);
  }

  //
  editFormName(formId: any, schema: any): Observable<Ischema> {
    console.log(formId);
    console.log(schema);

    return this.http.put<Ischema>(
      this._urlEditFormName + '?id=' + formId,
      schema.name
    );
  }
  editForm(schema: any, formId: any): Observable<Ischema> {
    console.log(formId);
    console.log(schema);

    return this.http.put<Ischema>(this._url1ViewForm + '?id=' + formId, schema);
  }
}
