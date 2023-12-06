import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportPageComponent } from './add-report-page.component';

describe('AddReportPageComponent', () => {
  let component: AddReportPageComponent;
  let fixture: ComponentFixture<AddReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReportPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
