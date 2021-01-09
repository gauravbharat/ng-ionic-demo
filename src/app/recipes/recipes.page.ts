import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[] = <Recipe[]>[];
  private _latestRecipesSub$!: Subscription;
  constructor(private _recipesService: RecipesService) {}

  ngOnInit() {
    // this._recipesService.getAllRecipes();
    // this._latestRecipesSub$ = this._recipesService.latestRecipes$.subscribe(
    //   (recipes: Recipe[]) => (this.recipes = recipes)
    // );
  }

  ionViewWillEnter() {
    this.recipes = this._recipesService.getAllRecipes();
  }

  ngOnDestroy(): void {
    this._latestRecipesSub$?.unsubscribe();
  }
}
