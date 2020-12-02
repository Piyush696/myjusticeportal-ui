import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerProfileComponent } from './lawyer-profile.component';

describe('LawyerProfileComponent', () => {
  let component: LawyerProfileComponent;
  let fixture: ComponentFixture<LawyerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
