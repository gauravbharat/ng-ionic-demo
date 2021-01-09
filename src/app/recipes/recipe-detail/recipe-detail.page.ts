import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe!: Recipe;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _recipesService: RecipesService,
    private _alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        this._router.navigate(['']);
        return;
      }

      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this._recipesService.getRecipe(recipeId);
    });
  }

  onDeleteRecipe(recipeId: string): void {
    this._alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'Do you really want to delete the recipe?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: () => {
              this._recipesService.deleteRecipe(recipeId);
              this._router.navigate(['']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
