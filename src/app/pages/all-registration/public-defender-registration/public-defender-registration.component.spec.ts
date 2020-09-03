import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDefenderRegistrationComponent } from './public-defender-registration.component';

describe('PublicDefenderRegistrationComponent', () => {
  let component: PublicDefenderRegistrationComponent;
  let fixture: ComponentFixture<PublicDefenderRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDefenderRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDefenderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
