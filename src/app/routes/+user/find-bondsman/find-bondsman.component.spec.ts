import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBondsmanComponent } from './find-bondsman.component';

describe('FindBondsmanComponent', () => {
  let component: FindBondsmanComponent;
  let fixture: ComponentFixture<FindBondsmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBondsmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBondsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
