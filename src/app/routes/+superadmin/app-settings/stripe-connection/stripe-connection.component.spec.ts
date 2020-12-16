import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeConnectionComponent } from './stripe-connection.component';

describe('StripeConnectionComponent', () => {
  let component: StripeConnectionComponent;
  let fixture: ComponentFixture<StripeConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
