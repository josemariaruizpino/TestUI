import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsDocsComponent } from './colors-docs.component';

describe('ColorsDocsComponent', () => {
  let component: ColorsDocsComponent;
  let fixture: ComponentFixture<ColorsDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorsDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
