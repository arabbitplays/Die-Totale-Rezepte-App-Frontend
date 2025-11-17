import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeComponent} from "./model/recipe/recipe.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeCreatorComponent} from "./recipe-creator/recipe-creator.component";
import {LoginComponent} from "./security/login/login.component";

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
  { path: 'recipes/:name', component: RecipeComponent },
  { path: 'recipeCreator', component: RecipeCreatorComponent },
  { path: 'signIn', component: LoginComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
