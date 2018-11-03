import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
  url = "https://ng-recipe-book-c156f.firebaseio.com/recipes.json";
  constructor(
    private http: Http,
    private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put(
      this.url, 
      this.recipeService.getRecipes())
  }

  getRecipes() {
    this.http.get(this.url)
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