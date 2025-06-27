import {ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {ProductsRepository} from './products.repository';
import {NotificationsService} from '../../../shared/service/services';

export const productDraftResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.params['uuid'];
  const router = inject(Router);
  const productsRepository = inject(ProductsRepository);
  const notificationsService = inject(NotificationsService);
  const draft = productsRepository?.getDraftProducts(uuid);

  if (draft?.length) {
    return draft[0];
  } else {
    notificationsService.error("Draft not found or doesn't exist");
    const productAdd = router.parseUrl("/products/add");
    return new RedirectCommand(productAdd);
  }
};
