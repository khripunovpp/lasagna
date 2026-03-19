import { Page } from '@playwright/test';

export class Recipes_Page {
    constructor(private page: Page) {}

  get dialogSatisfactionCloseButton() { return this.page.locator('[data-u2e="dialog-satisfaction.close-button"]'); }

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get recipesFiltersButton() { return this.page.locator('[data-u2e="recipes.filters.button"]'); }

  get recipesFiltersMaster() { return this.page.locator('[data-u2e="recipes.filters.master"]'); }

  get recipesFiltersChunk() { return this.page.locator('[data-u2e="recipes.filters.chunk"]'); }

  get recipesFiltersAll() { return this.page.locator('[data-u2e="recipes.filters.all"]'); }

  get groupingSortingGroupButton() { return this.page.locator('[data-u2e="grouping.sorting.group.button"]'); }

  get groupingSortingGroupByCategory() { return this.page.locator('[data-u2e="grouping.sorting.group.by-category"]'); }

  get groupingSortingGroupByTag() { return this.page.locator('[data-u2e="grouping.sorting.group.by-tag"]'); }

  get groupingSortingGroupByCreationDate() { return this.page.locator('[data-u2e="grouping.sorting.group.by-creation-date"]'); }

  get groupingSortingGroupByFirstLetter() { return this.page.locator('[data-u2e="grouping.sorting.group.by-first-letter"]'); }

  get groupingSortingDirectionButton() { return this.page.locator('[data-u2e="grouping.sorting.direction.button"]'); }

  get groupingSortingDirectionAsc() { return this.page.locator('[data-u2e="grouping.sorting.direction.asc"]'); }

  get groupingSortingDirectionDesc() { return this.page.locator('[data-u2e="grouping.sorting.direction.desc"]'); }

  get recipesListGroupingTiles() { return this.page.locator('[data-u2e="recipes.list.grouping-tiles"]'); }

  get recipesListEmptyStateAddButton() { return this.page.locator('[data-u2e="recipes.list.empty-state.add-button"]'); }

  get dialogSupportCloseButton() { return this.page.locator('[data-u2e="dialog-support.close-button"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }

  get dialogSupportCancelButton() { return this.page.locator('[data-u2e="dialog-support.cancel-button"]'); }

  get dialogSupportConfirmButton() { return this.page.locator('[data-u2e="dialog-support.confirm-button"]'); }

  get dialogTgStarsCloseButton() { return this.page.locator('[data-u2e="dialog-tg-stars.close-button"]'); }

  get tgStarsDonationStars2() { return this.page.locator('[data-u2e="tg-stars-donation.stars.2"]'); }

  get tgStarsDonationStars10() { return this.page.locator('[data-u2e="tg-stars-donation.stars.10"]'); }

  get tgStarsDonationStars50() { return this.page.locator('[data-u2e="tg-stars-donation.stars.50"]'); }

  get tgStarsDonationStars100() { return this.page.locator('[data-u2e="tg-stars-donation.stars.100"]'); }

  get numberInputTgStarsDonation() { return this.page.locator('[data-u2e="number-input.tg-stars-donation"]'); }

  get dialogTgStarsCancelButton() { return this.page.locator('[data-u2e="dialog-tg-stars.cancel-button"]'); }

  get dialogTgStarsConfirmButton() { return this.page.locator('[data-u2e="dialog-tg-stars.confirm-button"]'); }
}