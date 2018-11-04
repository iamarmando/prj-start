import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  url = "https://ng-recipe-book-c156f.firebaseio.com/recipes.json";
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getIdToken();
    return this.http.put(
      this.url + "?auth=" + token, 
      this.recipeService.getRecipes())
  }

  getRecipes() {
    const token = this.authService.getIdToken();
    this.http.get(this.url + "?auth=" + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for ( let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}