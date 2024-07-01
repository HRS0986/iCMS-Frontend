import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConditionService } from './condition.guard.service';
import { map } from 'rxjs/operators';


export const conditionGuard: CanActivateFn = (route, state) => {
  const conditionService = inject(ConditionService);
  const router = inject(Router);

  return conditionService.needToAuthorize$.pipe(
    map(needToAuthorize => {
      if (needToAuthorize) {
        router.navigate(['/email/permission']);
        return false;
      } 
      return true;
    })
  );


  // const conditionMet = conditionService.getCondition();
  // if (conditionMet) {
  //   // If condition is met, navigate to the specific component
  //   router.navigate(['/special-component']);
  //   return false; // Prevents original route activation
  // }
  // return true; // Allows route activation
};