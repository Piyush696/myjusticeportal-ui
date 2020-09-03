import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParalegalRegistrationComponent } from './paralegal-registration.component';

describe('ParalegalRegistrationComponent', () => {
  let component: ParalegalRegistrationComponent;
  let fixture: ComponentFixture<ParalegalRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParalegalRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParalegalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
