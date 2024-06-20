// authentication.service.ts
import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from "../../../environment/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";
import  {MessageService} from "primeng/api";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private userPool: any;
  private currentUserSubject: BehaviorSubject<CognitoUser | null>;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.clientId
    });
    this.currentUserSubject = new BehaviorSubject<CognitoUser | null>(this.userPool.getCurrentUser());
  }
  get currentUser(): Observable<CognitoUser | null> {
    return this.currentUserSubject.asObservable();
  }

  signIn(username: string, password: string): Observable<any> {
    console.log('Signing in user:', username);
    console.log('Password:', password);
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: this.userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session:any) => {
          observer.next(session);
          observer.complete();
        },
        onFailure: (err:any) => {
          observer.error(err);
          this.router.navigate(['/auth/signin']);
        }
      });
    });
  }

  signOut(): void {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      this.currentUserSubject.next(null);
    }
  }

getIdToken(): Observable<string> {
  return new Observable(observer => {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          observer.error(err);
          this.router.navigate(['/auth/signin']).then(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sign in error. Please sign in again.'});
          });
        } else {
          // Check if the session is valid
          if (session.isValid()) {
            observer.next(session.getIdToken().getJwtToken());
            observer.complete();
          } else {
            // If the session is not valid, throw an error
            observer.error('Session expired. Please sign in again.');
            this.router.navigate(['/auth/signin']).then(() => {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Session expired. Please sign in again.'});
            }
            );


          }
        }
      });
    } else {
      observer.error('No user found');
      this.router.navigate(['/auth/signin']).then(() => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Session expired. Please sign in again.'});
      }
      );

    }
  });
}
isAuthenticated(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          resolve(false);
        } else {
          resolve(session.isValid());
        }
      });
    } else {
      resolve(false);
    }
  });
}



}
