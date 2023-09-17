import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ischema } from './interfaces/schema';

@Injectable({
  providedIn: 'root',
})
export class CreateFormService {
  readonly _url1 =
    'https://formbuilderapi.azurewebsites.net/api/MainForm/ViewAllForms';
  //
  _url2 = 'https://formbuilderapi.azurewebsites.net/api/MainForm/CreateForm';

  constructor(private http: HttpClient) {}

  ViewAllForms(): Observable<any> {
    return this.http.get<Observable<any>>(this._url1);
  }

  CreateForm(data: any): Observable<Ischema> {
    console.log('done');
    // console.log(this.http.post<Ischema>(this._url2, data));

    return this.http.post<Ischema>(
      'https://formbuilderapi.azurewebsites.net/api/MainForm/CreateForm',
      data
    );
  }
}
