import {Item} from "./Item";
import {RecipeSection} from "./RecipeSection";

export class Recipe {
  private _name: string;
  private _items: Item[];
  private _sections: RecipeSection[];

  constructor(name: string, items: Item[], sections: RecipeSection[]) {
    this._name = name;
    this._items = items;
    this._sections = sections;
  }

  get name(): string {
    return this._name;
  }

  get items(): Item[] {
    return this._items;
  }

  get sections(): RecipeSection[] {
    return this._sections;
  }
}
