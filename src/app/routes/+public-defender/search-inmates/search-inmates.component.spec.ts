import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInmatesComponent } from './search-inmates.component';

describe('SearchInmatesComponent', () => {
  let component: SearchInmatesComponent;
  let fixture: ComponentFixture<SearchInmatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInmatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
