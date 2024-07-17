import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEndsComponent } from './loan-ends.component';

describe('LoanEndsComponent', () => {
  let component: LoanEndsComponent;
  let fixture: ComponentFixture<LoanEndsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanEndsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanEndsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
