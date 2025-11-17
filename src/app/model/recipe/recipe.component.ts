import {Component, OnInit} from '@angular/core';
import {EndpointHandler} from "../../endpoint/EndpointHandler";
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../Recipe";
import {ErrorHandler} from "../../error_handling/ErrorHandler";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {IngredientSelectorComponent} from "../../ingredient-selector/ingredient-selector.component";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [EndpointHandler]
})
export class RecipeComponent implements OnInit {
  recipe: Recipe = new Recipe("", [], []);
  private sub: any;

  constructor(private endpointHandler: EndpointHandler,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandler,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let name = params['name'];
      this.endpointHandler.getRecipeByName(name).then(
        recipe => {
          if (recipe) {
            this.recipe = recipe;
          }
        },
        (error) => {
          this.errorHandler.showError("Loading recipe failed with: " + error);
        });
    });
  }

  onAddToListClick(): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = false;
    dialogConfig.enterAnimationDuration = "300ms";
    dialogConfig.exitAnimationDuration = "200ms";

    dialogConfig.data = {
      items: this.recipe.items
    }
    this.dialog.open(IngredientSelectorComponent, dialogConfig);
    //this.router.navigateByUrl("/itemList")
  }
}
