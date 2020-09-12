import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsmanDashboardComponent } from './bondsman-dashboard.component';

describe('BondsmanDashboardComponent', () => {
  let component: BondsmanDashboardComponent;
  let fixture: ComponentFixture<BondsmanDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BondsmanDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BondsmanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
