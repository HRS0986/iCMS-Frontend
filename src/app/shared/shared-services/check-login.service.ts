import { Injectable } from '@angular/core';
import {AuthenticationService} from "../../auth/services/authentication.service";
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class CheckLoginService {

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  checkLogin() {
    this.authService.getIdToken().pipe(
      catchError(error => {
        if (error === 'Session expired. Please sign in again.') {
          this.router.navigate(['/auth/login']);
          // console.log('Session expired. Please sign in again.');
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get token'});
        }
        return of(null);
      })
    )
  }
}
