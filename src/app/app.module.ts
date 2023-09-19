import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SectionsComponent } from './sections/sections.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { TablePopUpComponent } from './table-pop-up/table-pop-up.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ViewAllFormsComponent } from './view-all-forms/view-all-forms.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewFormComponent } from './view-form/view-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    UserInfoComponent,
    SectionsComponent,
    CustomModalComponent,
    TablePopUpComponent,
    EditFormComponent,
    ViewAllFormsComponent,
    PageNotFoundComponent,
    ViewFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
