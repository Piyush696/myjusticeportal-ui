import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesageListComponent } from './mesage-list.component';

describe('MesageListComponent', () => {
  let component: MesageListComponent;
  let fixture: ComponentFixture<MesageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
