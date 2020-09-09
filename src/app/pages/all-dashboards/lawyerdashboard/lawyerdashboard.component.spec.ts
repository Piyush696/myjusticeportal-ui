import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerdashboardComponent } from './lawyerdashboard.component';

describe('LawyerdashboardComponent', () => {
  let component: LawyerdashboardComponent;
  let fixture: ComponentFixture<LawyerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
