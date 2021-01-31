import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAllTransactionsComponent } from './shared-all-transactions.component';

describe('SharedAllTransactionsComponent', () => {
  let component: SharedAllTransactionsComponent;
  let fixture: ComponentFixture<SharedAllTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedAllTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAllTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
