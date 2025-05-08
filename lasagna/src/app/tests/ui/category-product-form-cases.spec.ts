import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {
  AddCategoryFormComponent
} from '../../view/settings/categories/category-product/add-category/add-category-form.component';
import {CategoryProductsRepository} from '../../service/repositories';
import {ButtonComponent} from '../../view/ui/layout/button.component';
import {InputComponent} from '../../view/ui/form/input.component';
import {ControlComponent} from '../../view/ui/form/control.component';
import {GapRowComponent} from '../../view/ui/layout/gap-row.component';
import {ExpandDirective} from '../../view/directives/expand.directive';
import {NoWrapDirective} from '../../view/directives/no-wrap.directive';
import {ComponentRef} from '@angular/core';
import {defaultImports} from '../default-imports';
import {defaultProviders} from '../default-providers';
import {CategoryProduct} from '../../service/models/CategoryProduct';
import {NotificationsService} from '../../service/services';

describe('AddCategoryFormComponent', () => {
  let component: AddCategoryFormComponent;
  let componentRef: ComponentRef<AddCategoryFormComponent>;
  let fixture: ComponentFixture<AddCategoryFormComponent>;
  let categoryRepositorySpy: jasmine.SpyObj<CategoryProductsRepository>;
  let notificationsServiceSpy: jasmine.SpyObj<NotificationsService>;

  const mockedUUID = '12345';
  const testCategoryName = 'Test Category';

  beforeEach(async () => {  // Создаем шпион для CategoryProductsRepository
    categoryRepositorySpy = jasmine.createSpyObj('CategoryProductsRepository', ['getOne', 'addOne']);
    categoryRepositorySpy.getOne.and.resolveTo(new CategoryProduct(testCategoryName, testCategoryName));

    notificationsServiceSpy = jasmine.createSpyObj('NotificationsService', ['success']);

    await TestBed.configureTestingModule({
      imports: [
        ...defaultImports,
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
        ControlComponent,
        GapRowComponent,
        ExpandDirective,
        NoWrapDirective,
        AddCategoryFormComponent,
      ],
      providers: [
        ...defaultProviders,
        {provide: CategoryProductsRepository, useValue: categoryRepositorySpy},
        {provide: NotificationsService, useValue: notificationsServiceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryFormComponent);
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
    categoryRepositorySpy.getOne.and.resolveTo(CategoryProduct.fromRaw(undefined));
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

    categoryRepositorySpy.addOne.and.resolveTo('awegvwve');
    await component.addCategory();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(categoryRepositorySpy.addOne).toHaveBeenCalledOnceWith(CategoryProduct.fromRaw({name: newCategoryName}));
    expect(notificationsServiceSpy.success).toHaveBeenCalledWith('Category added');

    expect(component.form.value.name).toBe('');

    await component.addCategory();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(categoryRepositorySpy.addOne).toHaveBeenCalledTimes(1);
  });
});
