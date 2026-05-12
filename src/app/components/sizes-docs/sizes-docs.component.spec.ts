import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesDocsComponent } from './sizes-docs.component';

describe('SizesDocsComponent', () => {
  let component: SizesDocsComponent;
  let fixture: ComponentFixture<SizesDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SizesDocsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizesDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
