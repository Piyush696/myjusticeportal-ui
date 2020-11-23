import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalResearchAssistanceComponent } from './legal-research-assistance.component';

describe('LegalResearchAssistanceComponent', () => {
  let component: LegalResearchAssistanceComponent;
  let fixture: ComponentFixture<LegalResearchAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalResearchAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalResearchAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
