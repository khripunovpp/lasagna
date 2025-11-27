import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AddProductComponent} from '../../features/products/view/add-product/add-product.component';
import {ProductsRepository} from '../../shared/service/repositories';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from '../../shared/service/services';
import {of} from 'rxjs';
import {Product} from '../../features/products/service/Product';
import {defaultProviders} from '../default-providers';
import {defaultImports} from '../default-imports';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockProductsRepo: jasmine.SpyObj<ProductsRepository>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNotifications: jasmine.SpyObj<NotificationsService>;

  beforeEach(async () => {
    mockProductsRepo = jasmine.createSpyObj('ProductsRepository', [
      'getOne',
      'addOne',
      'getTopCategories',
      'getTopSources',
      'updateOne',
      'removeDraftProduct',
      'saveDraftProduct',
      'updateDraftProduct',
      'deleteProduct'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockNotifications = jasmine.createSpyObj('NotificationsService', ['success']);

    mockProductsRepo.getTopCategories.and.returnValue(Promise.resolve([]));
    mockProductsRepo.getTopSources.and.returnValue(Promise.resolve([]));
  });

  async function createComponent(
    providers: any[] = [],
  ) {
    await TestBed.configureTestingModule({
      imports: [
        ...defaultImports,
        AddProductComponent
      ],
      providers: [
        ...defaultProviders,
        {provide: Router, useValue: mockRouter},
        {provide: ProductsRepository, useValue: mockProductsRepo},
        {provide: NotificationsService, useValue: mockNotifications},
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            data: of({})
          }
        },
        ...providers
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
  }

  describe('должен загрузить продукт, если есть uuid и нет драфта', () => {
    it('success', fakeAsync(() => {
      createComponent([
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({uuid: '123'}),
            data: of({})
          }
        }
      ]);
      tick();

      const mockProduct = Product.empty();
      mockProductsRepo.getOne.and.returnValue(Promise.resolve(mockProduct));
      fixture.detectChanges();
      tick();

      expect(mockProductsRepo.getOne).toHaveBeenCalledWith('123');
      expect(component.product()).toEqual(mockProduct);
    }));
  })

  describe('должен загрузить продукт, если есть uuid и драфт, загрузится драфт', () => {

    it('success', fakeAsync(() => {
      createComponent([
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({uuid: 'recipe123'}),
            data: of({
              draft: {
                uuid: 'draft123',
                data: Product.empty().toDTO(),
                meta: {}
              }
            })
          }
        }]
      );
      tick();

      const mockProduct = Product.empty();
      mockProductsRepo.getOne.and.returnValue(Promise.resolve(mockProduct));
      fixture.detectChanges();
      tick();

      expect(mockProductsRepo.getOne).toHaveBeenCalledTimes(0);
    }));
  });

  describe('должен ничего не загружать, если нет uuid и нет драфта', () => {
    it('success', fakeAsync(() => {
      createComponent();
      tick();

      const mockProduct = Product.empty();
      mockProductsRepo.getOne.and.returnValue(Promise.resolve(mockProduct));
      fixture.detectChanges();
      tick();

      expect(mockProductsRepo.getOne).toHaveBeenCalledTimes(0);
    }));
  });

  describe('должен создать продукт из драфта когда он есть', () => {
    const product = Product.fromRaw({
      uuid: 'draft123',
      name: 'Draft Product',
      price: 100,
      category: 'Draft Category',
      amount: 1,
    });

    it('success', fakeAsync(() => {
      createComponent([
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            data: of({
              draft: {
                uuid: 'draft123',
                data: product.toDTO(),
                meta: {}
              }
            })
          }
        }]
      );
      tick();

      fixture.detectChanges();

      expect(mockProductsRepo.getOne).toHaveBeenCalledTimes(0);
      expect(component.product()?.name).toEqual(product.name);
      expect(component.product()?.uuid).toEqual(product.uuid);
    }));
  });
});
