import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  arr: Array<Element>[];

  constructor() {
    this.arr = [];
  }

  getAllSections() {
    return this.arr;
  }
  addNewSection(section: any) {
    this.arr.push(section);
  }
}
