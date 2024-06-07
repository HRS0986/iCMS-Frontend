import { CanActivateFn } from '@angular/router';

export const conditionGuard: CanActivateFn = (route, state) => {
  return true;
};
