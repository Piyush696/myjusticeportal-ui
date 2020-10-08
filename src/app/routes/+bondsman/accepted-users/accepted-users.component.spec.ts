import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedUsersComponent } from './accepted-users.component';

describe('AcceptedUsersComponent', () => {
  let component: AcceptedUsersComponent;
  let fixture: ComponentFixture<AcceptedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
