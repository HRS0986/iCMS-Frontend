// authentication.service.ts
import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
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
        onSuccess: (session) => {
          observer.next(session);
          observer.complete();
        },
        onFailure: (err) => {
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
}
