import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingLawyerComponent } from './messaging-lawyer.component';

describe('MessagingLawyerComponent', () => {
  let component: MessagingLawyerComponent;
  let fixture: ComponentFixture<MessagingLawyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingLawyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
