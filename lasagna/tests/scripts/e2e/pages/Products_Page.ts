import { Page } from '@playwright/test';

export class Products_Page {
    constructor(private page: Page) {}

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get productsListAddButton() { return this.page.locator('[data-u2e="products.list.add-button"]'); }

  get productsListExportButton() { return this.page.locator('[data-u2e="products.list.export-button"]'); }

  get productsListImportButton() { return this.page.locator('[data-u2e="products.list.import-button"]'); }

  get upload() { return this.page.locator('[data-u2e="upload."]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get productsListGroupingTiles() { return this.page.locator('[data-u2e="products.list.grouping-tiles"]'); }

  get groupingTilesSection0() { return this.page.locator('[data-u2e="grouping-tiles.section.0"]'); }

  get titleLevel3() { return this.page.locator('[data-u2e="title.level.3"]'); }

  get groupingTilesSection1() { return this.page.locator('[data-u2e="grouping-tiles.section.1"]'); }

  get groupingTilesSection2() { return this.page.locator('[data-u2e="grouping-tiles.section.2"]'); }

  get groupingTilesSection3() { return this.page.locator('[data-u2e="grouping-tiles.section.3"]'); }

  get groupingTilesSection4() { return this.page.locator('[data-u2e="grouping-tiles.section.4"]'); }

  get groupingTilesSection5() { return this.page.locator('[data-u2e="grouping-tiles.section.5"]'); }

  get groupingTilesSection6() { return this.page.locator('[data-u2e="grouping-tiles.section.6"]'); }

  get groupingTilesSection7() { return this.page.locator('[data-u2e="grouping-tiles.section.7"]'); }

  get groupingTilesSection8() { return this.page.locator('[data-u2e="grouping-tiles.section.8"]'); }

  get groupingTilesSection9() { return this.page.locator('[data-u2e="grouping-tiles.section.9"]'); }

  get groupingTilesSection10() { return this.page.locator('[data-u2e="grouping-tiles.section.10"]'); }

  get groupingTilesSection11() { return this.page.locator('[data-u2e="grouping-tiles.section.11"]'); }

  get groupingTilesSection12() { return this.page.locator('[data-u2e="grouping-tiles.section.12"]'); }

  get groupingTilesSection13() { return this.page.locator('[data-u2e="grouping-tiles.section.13"]'); }

  get groupingTilesSection14() { return this.page.locator('[data-u2e="grouping-tiles.section.14"]'); }

  get groupingTilesSection15() { return this.page.locator('[data-u2e="grouping-tiles.section.15"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}