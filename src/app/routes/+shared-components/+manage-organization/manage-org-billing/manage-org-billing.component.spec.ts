import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrgBillingComponent } from './manage-org-billing.component';

describe('ManageOrgBillingComponent', () => {
  let component: ManageOrgBillingComponent;
  let fixture: ComponentFixture<ManageOrgBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrgBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrgBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
