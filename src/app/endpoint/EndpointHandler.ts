import {Injectable} from "@angular/core";
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Recipe} from "../model/Recipe";
import {DataParser} from "../parser/DataParser";
import {Item} from "../model/Item";
import {ConfigUtil} from "../config/ConfigUtil";
import {AuthenticationService} from "../security/auth.service";

@Injectable()
export class EndpointHandler {
  backendURL: string;
  dataParser: DataParser;


  constructor(private httpClient: HttpClient, private authService: AuthenticationService, private configUtil: ConfigUtil) {
    this.backendURL = "http://" + configUtil.getValueAtKey("host") + ":" + configUtil.getValueAtKey("port");
    this.dataParser = new DataParser();
  }

  public async getAllRecipeNames(): Promise<string[]> {
    let result: string[] = [];
    await lastValueFrom(this.httpClient.get(this.backendURL + "/recipe/getAllNames",
      {responseType: "text"})).then( response => {
      if (response) {
        result = JSON.parse(response);
      }
    });
    return result;
  }

  public async getRecipeByName(name: string): Promise<Recipe | undefined> {
    let result;
    await lastValueFrom(this.httpClient.get(this.backendURL + "/recipe/" + name,
      {responseType: "text"})).then( response => {
      if (response) {
        result = this.dataParser.loadRecipeFromJson(response);
      }
    });
    return result;
  }

  public async addRecipe(recipe: Recipe) {
    let body = this.dataParser.serializeRecipe(recipe);
    if (!this.authService.isUserLoggedIn())
      throw new Error("Sign in required!");
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', this.authService.getLoggenInUserToken());
    await lastValueFrom(this.httpClient.post(this.backendURL + "/recipe", body,
      { responseType: "text", 'headers':headers, withCredentials: true })).then(
        () => {
          console.log("Recipe added");
        }
      );
  }

  public async addItem(item: Item) {
    let body = this.dataParser.getItemAsString(item);
    if (!this.authService.isUserLoggedIn())
      throw new Error("Sign in required!");
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', this.authService.getLoggenInUserToken());
    await lastValueFrom(this.httpClient.post(this.backendURL + "/item", body,
      { responseType: "text", 'headers':headers, withCredentials: true })).then(
      () => {
        console.log("Item added");
      }
    );
  }

  public async getAllItems(): Promise<Item[] | undefined> {
    let result;
    await lastValueFrom(this.httpClient.get(this.backendURL + "/item/getAllItems",
      {responseType: "text"})).then( response => {
      if (response) {
        result = this.dataParser.loadItemsFromJson(response);
      }
    });

    return result;
  }

  public async addItemsToList(items: Item[]) {
    let body = this.dataParser.getItemsAsString(items);
    let headers = { 'content-type': 'application/json'}
    await lastValueFrom(this.httpClient.put(this.backendURL + "/item/addItems", body,
      { responseType: "text", 'headers':headers })).then( () => {
      for (let item of items) {
        console.log("Added " + item.getAsString());
      }
    });
  }

  public async removeItems(items: Item[]) {
    let body = this.dataParser.getItemsAsString(items);
    let headers = { 'content-type': 'application/json'}
    await lastValueFrom(this.httpClient.put(this.backendURL + "/item/removeItems", body,
      { responseType: "text", 'headers':headers })).then( () => {
      for (let item of items) {
        console.log("Removed " + item.getAsString());
      }
    });
  }

  public async getCurrentListItems(): Promise<Item[] | undefined> {
    let result;
    await lastValueFrom(this.httpClient.get(this.backendURL + "/item/list",
      {responseType: "text"})).then( response => {
      if (response) {
        result = this.dataParser.loadItemsFromJson(response);
      }
    });
    return result;
  }

  public async login(username: string, password: string): Promise<boolean> {
    let result = false;
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', this.authService.createAuthenticationToken(username, password));
    await lastValueFrom(this.httpClient.post(this.backendURL + "/login", {},
      { responseType: "text", 'headers':headers})).then( response => {
      if (response) {
        let responseObject = JSON.parse(response);
        result = responseObject.authenticated;
      }
    });
    return result;
  }

  public async logout() {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', this.authService.getLoggenInUserToken());
    await lastValueFrom(this.httpClient.post(this.backendURL + "/logout",
      { responseType: "text", 'headers':headers, withCredentials: true})).then( () => {
        console.log("Logout successful!");
    });
  }
}
