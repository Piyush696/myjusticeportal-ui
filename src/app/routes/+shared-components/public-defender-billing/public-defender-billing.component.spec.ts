import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDefenderBillingComponent } from './public-defender-billing.component';

describe('PublicDefenderBillingComponent', () => {
  let component: PublicDefenderBillingComponent;
  let fixture: ComponentFixture<PublicDefenderBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDefenderBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDefenderBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
