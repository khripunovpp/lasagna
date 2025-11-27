import {expect, test} from '@playwright/test';
import {ProductsListPage} from '../../scripts/e2e/classes/ProductsListPage';
import {ProductPage} from '../../scripts/e2e/classes/ProductPage';
import {buildUrl, URLS} from '../../helpers/urls.const';

test('Склад и переход в карточку продукта', async ({page}) => {
  const productsListPage = new ProductsListPage(page);
  const productPage = new ProductPage(page);

  await page.goto(URLS.product.list);

  await expect(productsListPage.ref.productsListGroupingTiles).toBeVisible();

  if (await productsListPage.hasGroups) {
    const getFirstGroup = productsListPage.getGroupByIndex(0)
    await getFirstGroup.click();

    const firstLink = productsListPage.getItemLinkInGroupByIndex(0, 0);
    await expect(firstLink).toBeVisible();

    const href = await firstLink.getAttribute('href');
    const name = await firstLink.textContent();

    await firstLink.click();
    await expect(page).toHaveURL(buildUrl(href || ''));

    await expect(productPage.title).toBeVisible();

    const nameOnPage = await productPage.title.textContent()
    expect(nameOnPage?.trim()).toContain(name?.trim());
  } else {
    await productsListPage.ref.productsListAddButton.click();
    await expect(page).toHaveURL(/\/products\/add/);
  }
});
