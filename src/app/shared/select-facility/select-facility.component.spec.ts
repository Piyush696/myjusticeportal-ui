import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFacilityComponent } from './select-facility.component';

describe('SelectFacilityComponent', () => {
  let component: SelectFacilityComponent;
  let fixture: ComponentFixture<SelectFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
