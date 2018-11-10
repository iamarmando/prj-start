import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import 'rxjs/Rx';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  url = "https://ng-recipe-book-c156f.firebaseio.com/recipes.json";
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getIdToken();
    // return this.httpClient.put(
    //   this.url, 
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: new HttpHeaders().set('Authorization', 'Bearer afdklasflaidf')
    //   })
    const req = new HttpRequest('PUT',this.url, this.recipeService.getRecipes(),
      {reportProgress: true})
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getIdToken();
    // this.httpClient.get<Recipe[]>(this.url + "?auth=" + token)
    this.httpClient.get<Recipe[]>(this.url, {
      observe: 'body',
      params: new HttpParams().set('auth', token),
      responseType: 'json'
    })
      .map(
        (recipes) => {
          console.log(recipes);
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