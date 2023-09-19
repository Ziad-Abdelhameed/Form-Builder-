import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFormsComponent } from './view-all-forms.component';

describe('ViewAllFormsComponent', () => {
  let component: ViewAllFormsComponent;
  let fixture: ComponentFixture<ViewAllFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllFormsComponent]
    });
    fixture = TestBed.createComponent(ViewAllFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
