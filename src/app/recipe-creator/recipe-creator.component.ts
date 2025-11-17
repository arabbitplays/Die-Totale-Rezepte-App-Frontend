import {Component} from '@angular/core';
import {Item} from "../model/Item";
import {EndpointHandler} from "../endpoint/EndpointHandler";
import {ErrorHandler} from "../error_handling/ErrorHandler";
import {Recipe} from "../model/Recipe";
import {RecipeSection} from "../model/RecipeSection";
import { FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.css']
})
export class RecipeCreatorComponent {
  items: Item[] = [];
  recipeNames: String[] = [];

  ingredients: Item[] = [];
  recipeSections: RecipeSection[] = [];

  recipeNameControl: FormControl;
  itemFormGroup: FormGroup;

  recipeUpdateControl: FormControl;
  itemUpdateControl: FormControl;
  NONE_OPTION = "None";

  constructor(private endpointHandler: EndpointHandler, private errorHandler: ErrorHandler) {
    this.endpointHandler.getAllItems().then(
      items => {
        if (items) {
          this.items = items;
        }
      },
      (error) => {
        this.errorHandler.showError("Loading items failed with: " + error);
      });

    this.endpointHandler.getAllRecipeNames().then(
      recipes => {
        if (recipes) {
          this.recipeNames = recipes;
        }
      },
      (error) => {
        this.errorHandler.showError("Loading recipes failed with: " + error);
      });

    this.recipeNameControl = new FormControl();
    this.recipeUpdateControl = new FormControl();
    this.recipeUpdateControl.valueChanges.subscribe((value: string) => this.setRecipeToUpdate(value));
    this.resetRecipeCreator();

    this.itemFormGroup = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(''),
      unit: new FormControl(''),
      fresh: new FormControl('')
    });
    this.itemUpdateControl = new FormControl();
    this.itemUpdateControl.valueChanges.subscribe((value: string) => this.setItemToUpdate(value));
  }

  resetRecipeCreator() {
    if (this.recipeUpdateControl.value)
      this.recipeUpdateControl.reset();
    this.recipeNameControl.reset();
    this.ingredients = [];

    this.recipeSections = [
      new RecipeSection("prep", []),
      new RecipeSection("process", []),
      new RecipeSection("notes", [])
    ]
  }

  resetItemCreator() {
    this.itemFormGroup.reset();
    if (this.itemUpdateControl.value)
      this.itemUpdateControl.reset();
  }

  addIngredient() {
    this.ingredients.push(new Item("", 0, "", false));
  }

  setIngredientToItem(ingredient: Item, option: string) {
    if (!option || option === this.NONE_OPTION)
      this.removeObjectFromArray(this.ingredients, ingredient);

    let itemToSet = this.getItemByName(option);
    if (!itemToSet) {
      ingredient.name = "";
      ingredient.amount = 0;
      ingredient.unitString = "";
      ingredient.fresh = false;
      return;
    }
    ingredient.name = itemToSet.name;
    ingredient.amount = itemToSet.amount;
    ingredient.unitString = itemToSet.unitString;
    ingredient.fresh = itemToSet.fresh;
  }

  addBulletPointTo(arr: string[]) {
    arr.push("");
  }

  removeObjectFromArray(arr: any[], object: any) {
    arr.splice(arr.indexOf(object), 1);
  }

  setAmount(ingredient: Item, event: Event) {
    ingredient.amount = Number.parseFloat((event.target as HTMLInputElement).value);
  }

  setUnit(ingredient: Item, event: Event) {
    ingredient.unitString = (event.target as HTMLInputElement).value;
  }

  setBulletPoint(arr: any[], index: number,  event: Event) {
    arr[index] = (event.target as HTMLInputElement).value;
  }

  addRecipe() {
    this.endpointHandler.addRecipe(new Recipe(this.recipeNameControl.value, this.ingredients, this.recipeSections)).then(
      () => {
        this.resetRecipeCreator();
      },
      (error) => {
        this.errorHandler.showError("Adding recipe failed with: " + error);
      });
  }

  setRecipeToUpdate(recipeName: string) {
    if (!recipeName) {
      this.resetRecipeCreator();
      return;
    }

    this.endpointHandler.getRecipeByName(recipeName).then(
      (recipe) => {
        if (recipe) {
          this.recipeNameControl.setValue(recipe.name);
          this.ingredients = recipe.items;
          this.recipeSections = recipe.sections;
        }
      },
      (error) => {
        this.errorHandler.showError("Loading recipe " + recipeName + " failed with: " + error);
      }
    )
  }

  addItem() {
    let values = this.itemFormGroup.value;
    if (!values.unit) {
      values.unit = "";
    }
    this.endpointHandler.addItem(new Item(values.name, values.amount, values.unit, values.fresh)).then(
      () => {
        this.resetItemCreator();
      },
      (error) => {
        this.errorHandler.showError("Adding item failed with: " + error);
      });
  }

  setItemToUpdate(itemName: string) {
    if (!itemName || itemName === this.NONE_OPTION) {
      this.resetItemCreator();
      return;
    }

    let item = this.getItemByName(itemName);
    if (!item)
      return;

    this.itemFormGroup.setValue({
      name: item.name,
      amount: item.amount,
      unit: item.unitString,
      fresh : item.fresh
    })
  }

  getItemByName(itemName: string): Item | undefined {
    for (let item of this.items) {
      if (item.name === itemName)
        return item;
    }
    return undefined;
  }

  getRecipeButtonLabel(): string {
    if (this.recipeUpdateControl.value)
      return "Update recipe";
    else
      return "Add recipe";
  }

  getItemButtonLabel(): string {
    if (this.itemUpdateControl.value)
      return "Update item";
    else
      return "Add item";
  }

  getItemOptions(): string[] {
    let result = [this.NONE_OPTION];
    for (let item of this.items) {
      result.push(item.name);
    }
    return result;
  }
}
