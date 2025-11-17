import {Component, OnInit} from '@angular/core';
import {Item} from "../model/Item";
import {EndpointHandler} from "../endpoint/EndpointHandler";
import {ErrorHandler} from "../error_handling/ErrorHandler";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];

  selectedItems: Item[] = [];

  constructor(private endpointHandler: EndpointHandler,
              private errorHandler: ErrorHandler) {
  }


  ngOnInit(): void {
    this.endpointHandler.getAllItems().then(
      items => {
        if (items) {
          this.items = items;
          this.filteredItems = items;
        }
      },
      (error) => {
        this.errorHandler.showError("Loading items failed with: " + error);
      });

    this.updateList();
  }

  onSelection(item: Item) {
    this.endpointHandler.addItemsToList([item]).then(
      () => {
        this.updateList();
      },
      (error) => {
        this.errorHandler.showError("Adding item failed with " + error);
      }
    )
  }

  onDeselection(item: Item) {
    this.endpointHandler.removeItems([item]).then(
      () => {
        this.updateList();
      },
      (error) => {
        this.errorHandler.showError("Removing item failed with " + error);
      }
    )
  }

  private updateList() {
    this.endpointHandler.getCurrentListItems().then(
      items => {
        if (items)
          this.selectedItems = items;
      },
      (error) => {
        this.errorHandler.showError("Loading shopping list failed with: " + error);
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredItems = this.items;
    }

    this.filteredItems = this.items.filter(
      item => item.name?.toLowerCase().includes(text.toLowerCase())
    );
  }
}
