import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBondsmanComponent } from './view-bondsman.component';

describe('ViewBondsmanComponent', () => {
  let component: ViewBondsmanComponent;
  let fixture: ComponentFixture<ViewBondsmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBondsmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBondsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
