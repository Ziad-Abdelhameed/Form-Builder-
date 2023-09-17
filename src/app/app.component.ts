import { Component, OnInit } from '@angular/core';
import { CreateFormService } from './create-form.service';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drag-drop';
  data: any = '';
  massage = 'hello';

  constructor(private createform: CreateFormService) {}
  ngOnInit(): void {
    // this.createform.ViewAllForms().subscribe((dta) => {
    //   console.log(dta);
    // });
  }
}
