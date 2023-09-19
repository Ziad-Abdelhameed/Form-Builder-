import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ViewAllFormsComponent } from './view-all-forms/view-all-forms.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  { path: '', component: ViewAllFormsComponent },
  { path: 'viewAllForms', component: ViewAllFormsComponent },
  {
    path: 'createForm',
    component: ReactiveFormComponent,
  },
  {
    path: 'createForm/:id',
    component: ReactiveFormComponent,
  },
  { path: 'viewForm/:formId', component: ViewFormComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
