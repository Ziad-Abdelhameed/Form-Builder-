import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PopupRoutingModule } from './popup-routing.module';
import { ParagraphComponent } from './paragraph/paragraph.component';

@NgModule({
  declarations: [ParagraphComponent],
  imports: [CommonModule, PopupRoutingModule, ReactiveFormsModule, FormsModule],
})
export class PopupModule {}
