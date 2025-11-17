import { Component, OnInit } from '@angular/core';
import {DataParser} from "../parser/DataParser";
import {EndpointHandler} from "../endpoint/EndpointHandler";
import {ErrorHandler} from "../error_handling/ErrorHandler";

@Component({
  selector: 'app-recipe-selector',
  templateUrl: './recipe-selector.component.html',
  styleUrls: ['./recipe-selector.component.css']
})
export class RecipeSelectorComponent implements OnInit {
  recipeNames: string[] = [];
  filteredRecipeNames: string[] = [];

  constructor(private endpointHandler: EndpointHandler,
              private errorHandler: ErrorHandler) {
  }

  ngOnInit(): void {
    this.endpointHandler.getAllRecipeNames().then(
      (response) => {
        this.recipeNames = response;
        this.filteredRecipeNames = response;
      },
      (error) => {
        this.errorHandler.showError("Loading recipe names failed with: " + error);
      }
    )
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredRecipeNames = this.recipeNames;
    }

    this.filteredRecipeNames = this.recipeNames.filter(
      recipeName => recipeName?.toLowerCase().includes(text.toLowerCase())
    );
  }
}
