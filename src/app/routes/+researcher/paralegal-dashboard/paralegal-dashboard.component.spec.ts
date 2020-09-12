import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParalegalDashboardComponent } from './paralegal-dashboard.component';

describe('ParalegalDashboardComponent', () => {
  let component: ParalegalDashboardComponent;
  let fixture: ComponentFixture<ParalegalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParalegalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParalegalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
