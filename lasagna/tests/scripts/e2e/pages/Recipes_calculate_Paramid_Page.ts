import { Page } from '@playwright/test';

export class Recipes_calculate_Paramid_Page {
    constructor(private page: Page) {}

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get titleLevel3() { return this.page.locator('[data-u2e="title.level.3"]'); }

  get calculateRecipeEmptyStateEditRecipeBtn() { return this.page.locator('[data-u2e="calculate-recipe.empty-state-edit-recipe-btn"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}