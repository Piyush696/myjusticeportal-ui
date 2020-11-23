import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLegalResearchFormComponent } from './view-legal-research-form.component';

describe('ViewLegalResearchFormComponent', () => {
  let component: ViewLegalResearchFormComponent;
  let fixture: ComponentFixture<ViewLegalResearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLegalResearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLegalResearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
