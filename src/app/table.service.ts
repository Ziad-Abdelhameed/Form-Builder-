import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itable } from './interfaces/table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  readonly url = 'http://localhost:3000/tables';

  // size: Itable[] = [];
  size: any = [];
  sizeOfTables: any = 0;
  //
  createTable(table: any): Observable<any> {
    return this.http.post(this.url, table);
  }
  tableId: number = 2;
  getTable(): Observable<Itable> {
    return this.http.get<Itable>(this.url + '/' + this.tableId);
  }

  mainFormEdit(table: any): Observable<Itable> {
    // console.log('hello');

    return this.http.put<Itable>(this.url + '/' + this.tableId++, table);
  }
}
