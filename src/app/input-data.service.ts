import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InputDataService {
  formInputData: any = ''; //popup
  constructor() {}

  getInputData(): Observable<any> {
    return this.formInputData;
  }
}
