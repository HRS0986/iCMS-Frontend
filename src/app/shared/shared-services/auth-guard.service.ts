import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { MessageService } from 'primeng/api';

export const AuthGuardService: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  return authService.getIdToken().pipe(
    map(token => !!token),
    catchError(error => {
      console.error('Error during login', error);
      if (error === 'Session expired. Please sign in again.') {
        router.navigate(['/auth/login']);
      } else {
        messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get token'});
      }
      return of(false);
    })
  );

};
