import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {FeatureFlagsService} from '../../../../shared/service/services/feature-flags.service';
import {FoldersRepository} from '../providers/folders.repository';

export const folderGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const featureFlags = inject(FeatureFlagsService);
  const router = inject(Router);

  if (!featureFlags.getFlagValue('folders')) {
    return router.createUrlTree(['/recipes']);
  }

  const folderUuid = route.paramMap.get('folderUuid');
  if (!folderUuid) {
    return router.createUrlTree(['/recipes']);
  }

  const folder = await inject(FoldersRepository).getOne(folderUuid);
  if (!folder) {
    return router.createUrlTree(['/recipes']);
  }

  return true;
};
