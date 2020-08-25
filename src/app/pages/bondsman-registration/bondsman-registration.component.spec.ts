import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsmanRegistrationComponent } from './bondsman-registration.component';

describe('BondsmanRegistrationComponent', () => {
  let component: BondsmanRegistrationComponent;
  let fixture: ComponentFixture<BondsmanRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BondsmanRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BondsmanRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
