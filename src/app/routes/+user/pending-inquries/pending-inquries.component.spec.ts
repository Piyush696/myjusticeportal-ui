import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInquriesComponent } from './pending-inquries.component';

describe('PendingInquriesComponent', () => {
  let component: PendingInquriesComponent;
  let fixture: ComponentFixture<PendingInquriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingInquriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInquriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
