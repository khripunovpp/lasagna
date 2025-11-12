import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from '../../shared/view/ui/button/button.component';
import {InputComponent} from '../../features/controls/form/input.component';
import {ControlComponent} from '../../features/controls/form/control-item/control.component';
import {FlexRowComponent} from '../../shared/view/layout/flex-row.component';
import {ExpandDirective} from '../../shared/view/directives/expand.directive';
import {NoWrapDirective} from '../../shared/view/directives/no-wrap.directive';
import {ComponentRef} from '@angular/core';
import {defaultImports} from '../default-imports';
import {defaultProviders} from '../default-providers';
import {NotificationsService} from '../../shared/service/services';
import {
  AddCategoryRecipeFormComponent
} from '../../shared/view/settings/categories/category-recipe/add-category/add-category-recipe-form.component';
import {CategoryRecipesRepository} from '../../shared/service/repositories';
import {CategoryRecipe} from '../../features/settings/service/models/CategoryRecipe';

describe('AddCategoryRecipeFormComponent', () => {
  let component: AddCategoryRecipeFormComponent;
  let componentRef: ComponentRef<AddCategoryRecipeFormComponent>;
  let fixture: ComponentFixture<AddCategoryRecipeFormComponent>;
  let categoryRepositorySpy: jasmine.SpyObj<CategoryRecipesRepository>;
  let notificationsServiceSpy: jasmine.SpyObj<NotificationsService>;

  const mockedUUID = '12345';
  const testCategoryName = 'Test Category';

  beforeEach(async () => {
    categoryRepositorySpy = jasmine.createSpyObj('CategoryRecipesRepository', ['getOne', 'addCategory']);
    categoryRepositorySpy.getOne.and.resolveTo(new CategoryRecipe(testCategoryName, testCategoryName));

    notificationsServiceSpy = jasmine.createSpyObj('NotificationsService', ['success']);

    await TestBed.configureTestingModule({
      imports: [
        ...defaultImports,
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
        ControlComponent,
        FlexRowComponent,
        ExpandDirective,
        NoWrapDirective,
        AddCategoryRecipeFormComponent,
      ],
      providers: [
        ...defaultProviders,
        {provide: CategoryRecipesRepository, useValue: categoryRepositorySpy},
        {provide: NotificationsService, useValue: notificationsServiceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryRecipeFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    fixture.detectChanges();
  });

  it('create form with UUID and existing category', async () => {
    componentRef.setInput('uuid', mockedUUID);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(categoryRepositorySpy.getOne).toHaveBeenCalledWith(mockedUUID);

    fixture.detectChanges();

    expect(component.form.value.name).toBe(testCategoryName);
    expect(component.category()?.name).toBe(testCategoryName);
  });

  it('should create form with empty category when no UUID is provided', async () => {
    categoryRepositorySpy.getOne.and.resolveTo(CategoryRecipe.fromRaw(undefined));
    componentRef.setInput('uuid', undefined);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.form.value.name).toBe('');
    expect(component.category()?.name).toBe('');
  });

  it('should change category model when form value changes', async () => {
    componentRef.setInput('uuid', mockedUUID);
    fixture.detectChanges();
    await fixture.whenStable();

    const newCategoryName = 'New Category';
    component.form.setValue({name: newCategoryName});
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.category()?.name).toBe(newCategoryName);
  });

  it('should call addCategory() and add a new category only once', async () => {
    component.form.setValue({name: 'Adding Category'});
    fixture.detectChanges();
    await fixture.whenStable();

    const newCategoryName = 'Updated Adding Category';
    component.form.setValue({name: newCategoryName});
    fixture.detectChanges();

    categoryRepositorySpy.addCategory.and.resolveTo('awegvwve');
    await component.addCategory();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(categoryRepositorySpy.addCategory).toHaveBeenCalledOnceWith(CategoryRecipe.fromRaw({name: newCategoryName}));
    expect(notificationsServiceSpy.success).toHaveBeenCalledWith('Category added');

    expect(component.form.value.name).toBe('');

    await component.addCategory();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(categoryRepositorySpy.addCategory).toHaveBeenCalledTimes(1);
  });
});
