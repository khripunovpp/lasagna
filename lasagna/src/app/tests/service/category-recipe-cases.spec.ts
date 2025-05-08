import {TestBed} from '@angular/core/testing';
import {DexieIndexDbService} from '../../service/db/dexie-index-db.service';
import {TranslateModule} from '@ngx-translate/core';
import {DB_NAME} from '../../service/tokens/db-name.token';
import {Stores} from '../../service/db/const/stores';
import {CategoryRecipesRepository} from '../../service/repositories';
import {CategoryRecipe} from '../../service/models/CategoryRecipe';

describe('Categories recipes cases', () => {
  let repository: CategoryRecipesRepository;
  let dexieIndexDbService: DexieIndexDbService;

  async function preInstallCategories() {
    for (let i = 0; i < 3; i++) {
      await repository.addCategory(new CategoryRecipe(`Category recipe ${Date.now() + i}`));
    }
  }

  beforeAll(async () => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        CategoryRecipesRepository,
        DexieIndexDbService,
        {provide: DB_NAME, useValue: 'TestDB'},
      ]
    });

    repository = TestBed.inject(CategoryRecipesRepository);
    dexieIndexDbService = TestBed.inject(DexieIndexDbService);
  });

  afterAll(async () => {
  });

  beforeEach(async () => {
    await dexieIndexDbService.clear(Stores.RECIPES_CATEGORIES);
    await preInstallCategories();
  });

  it('Add new category', async () => {
    const categoryName = 'New Category';
    const categoryRecipe = new CategoryRecipe(categoryName);
    const result = await repository.addCategory(categoryRecipe);
    const categories = await repository.getCategories();
    const addedCategory = await repository.getOne(result);

    expect(result).toBe(categoryName);
    expect(categories.length).toBe(4);
    expect(addedCategory.name).toBe(categoryName);
  });

  it('Get all', async () => {
    const categories = await repository.getCategories();
    expect(categories.length).toBe(3);
  });

  it('Update one', async () => {
    const existingCategory = new CategoryRecipe('Existing Category', 'Existing Category');
    const result = await repository.addCategory(existingCategory);
    const newCategory = existingCategory.copy();
    newCategory.setName('Updated Category');
    await repository.editCategory(result, newCategory);

    const updatedCategory = await repository.getOne(result);
    const categories = await repository.getCategories();

    expect(updatedCategory.name).toBe('Updated Category');
    expect(updatedCategory.uuid).toBe('Existing Category');
    expect(categories.length).toBe(4);
  });

  it('Delete one', async () => {
    const existingCategory = new CategoryRecipe('Deletable Category', 'Deletable Category');
    const result = await repository.addCategory(existingCategory);
    await repository.deleteCategory(result);

    const categories = await repository.getCategories();

    expect(categories.length).toBe(3);
  });
});
