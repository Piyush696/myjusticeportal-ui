import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillingSettingsComponent } from './update-billing-settings.component';

describe('UpdateBillingSettingsComponent', () => {
  let component: UpdateBillingSettingsComponent;
  let fixture: ComponentFixture<UpdateBillingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBillingSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
