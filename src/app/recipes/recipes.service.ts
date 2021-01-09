import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _recipesListener = new BehaviorSubject<Recipe[]>(<Recipe[]>[]);
  latestRecipes$ = this._recipesListener.asObservable();

  private _recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Chicken Curry',
      imageUrl:
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/03/chicken-curry-recipe.jpg',
      ingredients: ['1kg chicken', 'Veerappa Ghati Masala', 'Curd', 'Onion'],
    },
    {
      id: 'r2',
      title: 'Chicken Shawarma',
      imageUrl:
        'https://lifeloveandgoodfood.com/wp-content/uploads/2020/04/Chicken-Shawarma_09_1200x1200-720x540.jpg',
      ingredients: ['500g boneless chicken', 'Veerappa Garam Masala', 'Curd'],
    },
  ];

  constructor() {}

  getAllRecipes(): Recipe[] {
    this._recipesListener.next([...this._recipes]);
    return [...this._recipes];
  }

  getRecipe(recipeId: string): Recipe {
    return {
      ...this._recipes.find((recipe) => {
        return recipe.id === recipeId;
      }),
    };
  }

  deleteRecipe(recipeId: string): void {
    this._recipes = this._recipes.filter((recipe) => {
      return recipe.id !== recipeId;
    });
    this._recipesListener.next([...this._recipes]);
  }
}
