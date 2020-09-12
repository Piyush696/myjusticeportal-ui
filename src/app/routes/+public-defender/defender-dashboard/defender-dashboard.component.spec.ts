import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenderDashboardComponent } from './defender-dashboard.component';

describe('DefenderDashboardComponent', () => {
  let component: DefenderDashboardComponent;
  let fixture: ComponentFixture<DefenderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
