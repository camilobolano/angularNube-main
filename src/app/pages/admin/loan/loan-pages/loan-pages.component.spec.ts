import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPagesComponent } from './loan-pages.component';

describe('LoanPagesComponent', () => {
  let component: LoanPagesComponent;
  let fixture: ComponentFixture<LoanPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
