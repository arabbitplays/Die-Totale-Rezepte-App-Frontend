import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredSelectorComponent } from './filtered-selector.component';

describe('FilteredSelectorComponent', () => {
  let component: FilteredSelectorComponent;
  let fixture: ComponentFixture<FilteredSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredSelectorComponent]
    });
    fixture = TestBed.createComponent(FilteredSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
