import {TestBed} from '@angular/core/testing';
import {CategoryProductsRepository} from '../../shared/service/repositories';
import {DexieIndexDbService} from '../../shared/service/db/dexie-index-db.service';
import {CategoryProduct} from '../../features/settings/service/models/CategoryProduct';
import {TranslateModule} from '@ngx-translate/core';
import {DB_NAME} from '../../shared/service/tokens/db-name.token';
import {Stores} from '../../shared/service/db/const/stores';

describe('Categories products cases', () => {
  let repository: CategoryProductsRepository;
  let dexieIndexDbService: DexieIndexDbService;

  async function preInstallCategories() {
    for (let i = 0; i < 3; i++) {
      await repository.addOne(new CategoryProduct(`Category product ${Date.now() + i}`));
    }
  }

  beforeAll(async () => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        CategoryProductsRepository,
        DexieIndexDbService,
        {provide: DB_NAME, useValue: 'TestDB'},
      ]
    });

    repository = TestBed.inject(CategoryProductsRepository);
    dexieIndexDbService = TestBed.inject(DexieIndexDbService);
  });

  afterAll(async () => {
  });

  beforeEach(async () => {
    await dexieIndexDbService.clear(Stores.PRODUCTS_CATEGORIES);
    await preInstallCategories();
  });

  it('Add new category', async () => {
    const categoryName = 'New Category';
    const categoryProduct = new CategoryProduct(categoryName);
    const result = await repository.addOne(categoryProduct);
    const categories = await repository.getAll();
    const addedCategory = await repository.getOne(result);

    expect(result).toBe(categoryName);
    expect(categories.length).toBe(4);
    expect(addedCategory.name).toBe(categoryName);
  });

  it('Get all', async () => {
    const categories = await repository.getAll();
    expect(categories.length).toBe(3);
  });

  it('Update one', async () => {
    const existingCategory = new CategoryProduct('Existing Category', 'Existing Category');
    const result = await repository.addOne(existingCategory);
    const newCategory = existingCategory.copy();
    newCategory.setName('Updated Category');
    await repository.updateOne(result, newCategory);

    const updatedCategory = await repository.getOne(result);
    const categories = await repository.getAll();

    expect(updatedCategory.name).toBe('Updated Category');
    expect(updatedCategory.uuid).toBe('Existing Category');
    expect(categories.length).toBe(4);
  });

  it('Delete one', async () => {
    const existingCategory = new CategoryProduct('Deletable Category', 'Deletable Category');
    const result = await repository.addOne(existingCategory);
    await repository.deleteOne(result);

    const categories = await repository.getAll();

    expect(categories.length).toBe(3);
  });
});
