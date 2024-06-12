import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/services/authentication.service';
export const AuthGuardService: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/auth/signin']);
    return false;
  }
};
