import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegistrationComponent } from './email-registration.component';

describe('EmailRegistrationComponent', () => {
  let component: EmailRegistrationComponent;
  let fixture: ComponentFixture<EmailRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
