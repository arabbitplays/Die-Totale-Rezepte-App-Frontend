import {Component, Inject} from '@angular/core';
import {Item} from "../model/Item";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EndpointHandler} from "../endpoint/EndpointHandler";
import {ErrorHandler} from "../error_handling/ErrorHandler";

@Component({
  selector: 'app-ingredient-selector',
  templateUrl: './ingredient-selector.component.html',
  styleUrls: ['./ingredient-selector.component.css']
})
export class IngredientSelectorComponent {
  freshItems: Item[] = [];
  notFreshItems: Item[] = [];
  selectedMap = new Map<Item, boolean>();

  constructor(private dialogRef: MatDialogRef<IngredientSelectorComponent>, @Inject(MAT_DIALOG_DATA) data:any,
              private endpointHandler: EndpointHandler, private errorHandler: ErrorHandler) {
    this.dialogRef.updateSize('30%', '30%');
    this.initItems(data.items);
    this.addFreshItemsToList();
  }

  initItems(items: Item[]) {
    if (!items) {
      this.errorHandler.showError("Loading ingredient selector failed!");
      return;
    }

    for (let item of items) {
      if (item.fresh)
        this.freshItems.push(item);
      else
        this.notFreshItems.push(item);
      this.selectedMap.set(item, false);
    }
  }

  addFreshItemsToList(): void {
    this.endpointHandler.addItemsToList(this.freshItems).then(
      () => {
        for (let item of this.freshItems) {
          this.selectedMap.set(item, true);
        }
      },
      (error) => {
        this.errorHandler.showError("Adding fresh items failed with: " + error);
      }
    )
  }

  addItemToList(item: Item): void {
    this.endpointHandler.addItemsToList([item]).then(
      () => {
        this.selectedMap.set(item, true);
      },
      (error) => {
        this.errorHandler.showError("Adding item failed with: " + error);
      }
    )
  }

  removeItemFromList(item: Item): void {
    this.endpointHandler.removeItems([item]).then(
      () => {
        this.selectedMap.set(item, false);
      },
      (error) => {
        this.errorHandler.showError("Removing item failed with: " + error);
      }
    )
  }
}
