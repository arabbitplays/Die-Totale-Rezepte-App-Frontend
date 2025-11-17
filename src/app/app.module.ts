import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ItemComponent } from './model/item/item.component';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from "@angular/material/divider";
import { AppRoutingModule } from './app-routing.module';
import { RecipeComponent } from './model/recipe/recipe.component';
import { RecipeSelectorComponent } from './recipe-selector/recipe-selector.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {EndpointHandler} from "./endpoint/EndpointHandler";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ErrorHandler} from "./error_handling/ErrorHandler";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipeCreatorComponent } from './recipe-creator/recipe-creator.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfigUtil} from "./config/ConfigUtil";
import { LoginComponent } from './security/login/login.component';
import {MatCardModule} from "@angular/material/card";
import { FilteredSelectorComponent } from './filtered-selector/filtered-selector.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {IngredientSelectorComponent} from "./ingredient-selector/ingredient-selector.component";

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ItemComponent,
    RecipeComponent,
    RecipeSelectorComponent,
    NavigationComponent,
    RecipeCreatorComponent,
    LoginComponent,
    FilteredSelectorComponent,
    IngredientSelectorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    AppRoutingModule,
    MatTreeModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  exports: [ CommonModule ],
  providers: [
    EndpointHandler,
    HttpClient,
    ConfigUtil,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true},
    ErrorHandler,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
