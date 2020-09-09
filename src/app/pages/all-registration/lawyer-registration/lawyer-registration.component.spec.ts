import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerRegistrationComponent } from './lawyer-registration.component';

describe('LawyerRegistrationComponent', () => {
  let component: LawyerRegistrationComponent;
  let fixture: ComponentFixture<LawyerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
