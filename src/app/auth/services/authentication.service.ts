// // authentication.service.ts
// import { Injectable } from '@angular/core';
// import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserPool} from 'amazon-cognito-identity-js';
// import { environment } from "../../../environment/environment";
// import { Observable, BehaviorSubject } from 'rxjs';
// import {Router} from "@angular/router";
// import  {MessageService} from "primeng/api";
// import { catchError } from 'rxjs/operators';
// import  {apiEndpoint} from "../../app-settings/config";
// import { HttpClient,HttpHeaders } from '@angular/common/http';
// //import cookie service
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class AuthenticationService {
//   private userPool: any;
//   private currentUserSubject: BehaviorSubject<CognitoUser | null>;
//   cognitoUser: CognitoUser | null=null;
//   sessionUserAttributes!: any;
//
//   private permissionsSubject = new BehaviorSubject<string[]>([]);
//   permissions$ = this.permissionsSubject.asObservable();
//
//   constructor(
//     private router: Router,
//     private messageService: MessageService,
//     private http:HttpClient,
//   ) {
//     this.userPool = new CognitoUserPool({
//       UserPoolId: environment.cognito.userPoolId,
//       ClientId: environment.cognito.clientId
//     });
//     this.currentUserSubject = new BehaviorSubject<CognitoUser | null>(this.userPool.getCurrentUser());
//   }
//
//   public get currentUserValue(): CognitoUser | null {
//     return this.currentUserSubject.value;
//   }
//
//   signIn(username: string, password: string): Observable<any> {
//     console.log('Signing in user:', username);
//     console.log('Password:', password);
//     const authenticationData = {
//       Username: username,
//       Password: password
//     };
//     const authenticationDetails = new AuthenticationDetails(authenticationData);
//
//     const userData = {
//       Username: username,
//       Pool: this.userPool
//     };
//     const cognitoUser = new CognitoUser(userData);
//
//     return new Observable(observer => {
//       cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: (session:any) => {
//           observer.next(session);
//           observer.complete();
//         },
//         onFailure: (err:any) => {
//           observer.error(err);
//           this.router.navigate(['/auth/signin']).then(r => {
//             this.messageService.add({severity: 'error', summary: 'Error', detail: err.message});
//           });
//         },
//         newPasswordRequired: (userAttributes:any) => {
//           // Store cognitoUser for later use
//           this.cognitoUser = cognitoUser;
//           this.sessionUserAttributes = userAttributes;
//           this.messageService.add({severity: 'info', summary: 'New Password Required', detail: 'Please enter a new password.'});
//         }
//       });
//     });
//   }
//
//   changePassword(cognitoUser: CognitoUser | null, oldPassword: string, newPassword: string): Observable<any> {
//     return new Observable(observer => {
//       if (cognitoUser) {
//         cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
//           if (err) {
//             observer.error(err);
//           } else {
//             observer.next(result);
//             observer.complete();
//           }
//         });
//       } else {
//         observer.error('No user found');
//       }
//     });
//   }
//
//   signOut(): void {
//     const currentUser = this.userPool.getCurrentUser();
//     if (currentUser) {
//       //remove permissions from local storage
//       localStorage.removeItem(currentUser.getUsername() + '-permissions');
//       currentUser.signOut();
//       this.currentUserSubject.next(null);
//
//
//
//     }
//   }
//
//   getIdToken(): Observable<string> {
//     return new Observable(observer => {
//       const currentUser = this.userPool.getCurrentUser();
//       if (currentUser) {
//         currentUser.getSession((err: any, session: CognitoUserSession) => {
//           if (err) {
//             observer.error(err);
//             this.router.navigate(['/auth/signin']).then(() => {
//             this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sign in error. Please sign in again.'});
//             });
//           } else {
//             // Check if the session is valid
//             if (session.isValid()) {
//               observer.next(session.getIdToken().getJwtToken());
//               observer.complete();
//             } else {
//               // If the session is not valid, throw an error
//               observer.error('Session expired. Please sign in again.');
//               this.router.navigate(['/auth/signin']).then(() => {
//                 this.messageService.add({severity: 'error', summary: 'Error', detail: 'Session expired. Please sign in again.'});
//               }
//               );
//
//
//             }
//           }
//         });
//       } else {
//         observer.error('No user found');
//         this.router.navigate(['/auth/signin']).then(() => {
//           this.messageService.add({severity: 'error', summary: 'Error', detail: 'Session expired. Please sign in again.'});
//         }
//         );
//
//       }
//     });
//   }
//
//   getLastAuthUser(): CognitoUser | null {
//     return this.userPool.getCurrentUser();
//   }
//
//   getUserPermissions(token: string): any{
//     let apiUrl = apiEndpoint + '/getUserPermissions';
//     let headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//
//     //get last auth user from local storage
//     let lastAuthUser = this.getLastAuthUser();
//     console.log(lastAuthUser);
//
//     //get user name from cognito user
//     let user_name = lastAuthUser?.getUsername();
//     console.log(user_name);
//
//     return this.http.get<any>(
//       apiUrl + '/' + user_name,
//       {headers}
//     );
//
//
//   }
//
//   setPermissions(data: any) {
//     let user = this.getLastAuthUser();
//     //save permissions to local storage with related to user
//     localStorage.setItem(user?.getUsername() + '-permissions', JSON.stringify(data));
//   }
//
//   getPermissions() {
//     let user = this.getLastAuthUser();
//     //get permissions from local storage with related to user
//     return JSON.parse(localStorage.getItem(user?.getUsername() + '-permissions') || '{}');
//   }
// }


import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from "../../../environment/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from "../../app-settings/config";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userPool: any;
  private currentUserSubject: BehaviorSubject<CognitoUser | null>;
  cognitoUser: CognitoUser | null = null;
  sessionUserAttributes!: any;

  private permissionsSubject = new BehaviorSubject<string[]>([]);
  permissions$ = this.permissionsSubject.asObservable();

  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.clientId
    });
    this.currentUserSubject = new BehaviorSubject<CognitoUser | null>(this.userPool.getCurrentUser());

    this.loadPermissions(); // Load permissions on initialization
  }

  public get currentUserValue(): CognitoUser | null {
    return this.currentUserSubject.value;
  }

  signIn(username: string, password: string): Observable<any> {
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });
    const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool });

    return new Observable(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: any) => {
          this.loadPermissions();
          observer.next(session);
          observer.complete();
        },
        onFailure: (err: any) => {
          observer.error(err);
          this.router.navigate(['/auth/signin']).then(() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
          });
        },
        newPasswordRequired: (userAttributes: any) => {
          this.cognitoUser = cognitoUser;
          this.sessionUserAttributes = userAttributes;
          this.messageService.add({ severity: 'info', summary: 'New Password Required', detail: 'Please enter a new password.' });
        }
      });
    });
  }

  loadPermissions() {
    this.getIdToken().subscribe(
      token => {
        this.getUserPermissions(token).subscribe(
          permissions => {
            this.permissionsSubject.next(permissions);
            this.setPermissions(permissions);
          },
          error => {
            console.error('Error fetching permissions', error);
          }
        );
      },
      error => {
        console.error('Error fetching ID token', error);
      }
    );
  }

  getUserPermissions(token: string): Observable<string[]> {
    const apiUrl = `${apiEndpoint}/getUserPermissions`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    const user = this.getLastAuthUser();
    const username = user?.getUsername();

    return this.http.get<string[]>(`${apiUrl}/${username}`, { headers });
  }

  getIdToken(): Observable<string> {
    return new Observable(observer => {
      const currentUser = this.userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            observer.error(err);
            this.router.navigate(['/auth/signin']).then(() => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sign in error. Please sign in again.' });
            });
          } else if (session.isValid()) {
            observer.next(session.getIdToken().getJwtToken());
            observer.complete();
          } else {
            observer.error('Session expired. Please sign in again.');
            this.router.navigate(['/auth/signin']).then(() => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Session expired. Please sign in again.' });
            });
          }
        });
      } else {
        observer.error('No user found');
        this.router.navigate(['/auth/signin']).then(() => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Session expired. Please sign in again.' });
        });
      }
    });
  }

  getLastAuthUser(): CognitoUser | null {
    return this.userPool.getCurrentUser();
  }

  signOut(): void {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      localStorage.removeItem(currentUser.getUsername() + '-permissions');
      currentUser.signOut();
      this.currentUserSubject.next(null);
    }
  }
  setPermissions(data: any) {
    let user = this.getLastAuthUser();
    //save permissions to local storage with related to user
    localStorage.setItem(user?.getUsername() + '-permissions', JSON.stringify(data));
  }
}
