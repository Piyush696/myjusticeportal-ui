import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostageAppComponent } from './postage-app.component';

describe('PostageAppComponent', () => {
  let component: PostageAppComponent;
  let fixture: ComponentFixture<PostageAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostageAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostageAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
