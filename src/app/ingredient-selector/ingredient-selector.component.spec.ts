import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientSelectorComponent } from './ingredient-selector.component';

describe('IngredientSelectorComponent', () => {
  let component: IngredientSelectorComponent;
  let fixture: ComponentFixture<IngredientSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientSelectorComponent]
    });
    fixture = TestBed.createComponent(IngredientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
