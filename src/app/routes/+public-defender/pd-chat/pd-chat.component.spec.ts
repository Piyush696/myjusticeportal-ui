import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdChatComponent } from './pd-chat.component';

describe('PdChatComponent', () => {
  let component: PdChatComponent;
  let fixture: ComponentFixture<PdChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
