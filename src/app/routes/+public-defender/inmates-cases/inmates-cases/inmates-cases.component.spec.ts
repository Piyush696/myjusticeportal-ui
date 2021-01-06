import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmatesCasesComponent } from './inmates-cases.component';

describe('InmatesCasesComponent', () => {
  let component: InmatesCasesComponent;
  let fixture: ComponentFixture<InmatesCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmatesCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmatesCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
