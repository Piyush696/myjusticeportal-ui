import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwilioCredentialsComponent } from './twilio-credentials.component';

describe('TwilioCredentialsComponent', () => {
  let component: TwilioCredentialsComponent;
  let fixture: ComponentFixture<TwilioCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwilioCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwilioCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
