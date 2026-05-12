import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDocsComponent } from './display-docs.component';

describe('DisplayDocsComponent', () => {
  let component: DisplayDocsComponent;
  let fixture: ComponentFixture<DisplayDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
