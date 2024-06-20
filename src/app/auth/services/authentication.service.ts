// authentication.service.ts
import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from "../../../environment/environment";
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private userPool: any;
  private currentUserSubject: BehaviorSubject<CognitoUser | null>;

  constructor() {
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
          } else {
            observer.next(session.getIdToken().getJwtToken());
            observer.complete();
          }
        });
      } else {
        observer.error('No user found');
      }
    });
  }

  isAuthenticated(): boolean {
    const currentUser = this.userPool.getCurrentUser();
    return currentUser != null;
  }
}
