import {Recipe} from "../model/Recipe";
import {RecipeSection} from "../model/RecipeSection";
import {Item} from "../model/Item";

export class DataParser {
  public loadRecipesFromJSON(jsonString: string): Recipe[] {
    let jsonObj = JSON.parse(jsonString);
    let result: Recipe[] = [];
    for (let recipe of jsonObj) {
      result.push(new Recipe(recipe.name, [], [
        new RecipeSection("Preparation", recipe.prep),
        new RecipeSection("Process", recipe.process),
        new RecipeSection("Notes", recipe.notes),
      ]));
    }
    return result;
  }


  public loadRecipeFromJson(jsonString: string): Recipe {
    let jsonObj = JSON.parse(jsonString);
    let result: Recipe;
    let items: Item[] = [];

    for (let jsonItem of jsonObj.ingredients) {
      items.push(new Item(jsonItem.item.name, jsonItem.amount, jsonItem.unit, jsonItem.item.fresh));
    }

      result = new Recipe(jsonObj.name, items, [
        new RecipeSection("Preparation", jsonObj.prep),
        new RecipeSection("Process", jsonObj.process),
        new RecipeSection("Notes", jsonObj.notes),
      ]);
    return result;
  }

  public loadItemsFromJson(jsonString: string): Item[] {
    let jsonObj = JSON.parse(jsonString);
    let result: Item[] = [];
    for (let jsonItem of jsonObj) {
        result.push(new Item(jsonItem.name, jsonItem.amount, jsonItem.unitString, jsonItem.fresh));
    }
    return result;
  }

  public getItemsAsString(items: Item[]): String {
    let result = [];
    for (let item of items) {
      result.push({name: item.name, amount: item.amount});
    }
    return JSON.stringify(result);
  }

  public getItemAsString(item: Item): string {
    return JSON.stringify({name: item.name, unitString: item.unitString, amount: item.amount, fresh: item.fresh});
  }

  public serializeRecipe(recipe: Recipe): string {
    let serializedItems = this.serializeItems(recipe.items);
    let jsonObj = {
      name: recipe.name,
      ingredients: serializedItems,
      prep: recipe.sections[0].bulletPoints,
      process: recipe.sections[1].bulletPoints,
      notes: recipe.sections[2].bulletPoints
    }
    return JSON.stringify(jsonObj);
  }

  serializeItems(items: Item[]): any[] {
    let result = [];
    for (let item of items) {
      result.push({
        name: item.name,
        amount: item.amount.toString(),
        unit: item.unitString,
      });
    }
    return result;
  }
}
