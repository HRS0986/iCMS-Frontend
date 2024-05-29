// authentication.service.ts
import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from "../../../environment/environment";
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
// export class AuthenticationService {
//   userPool: any;
//   private limit: number | undefined;
//   private paginationToken: null = null;
//
//   constructor() {
//     this.userPool = new CognitoUserPool({
//       UserPoolId: environment.cognito.userPoolId,
//       ClientId: environment.cognito.clientId
//     });
//   }
//
//   signIn(username: string, password: string): Promise<CognitoUserSession> {
//     const authenticationData = {
//       Username: username,
//       Password: password
//     };
//
//     const authenticationDetails = new AuthenticationDetails(authenticationData);
//
//     const userData = {
//       Username: username,
//       Pool: this.userPool
//     };
//
//     const cognitoUser = new CognitoUser(userData);
//
//     return new Promise((resolve, reject) => {
//       cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: (session: CognitoUserSession) => {
//           resolve(session);
//         },
//         onFailure: (err: any) => {
//           reject(err);
//         }
//       });
//     });
//   }
//
//   getUser(): CognitoUser | null {
//     return this.userPool.getCurrentUser();
//   }
//
//
//   signOut(): void {
//     const currentUser = this.userPool.getCurrentUser();
//     if (currentUser) {
//       currentUser.signOut();
//     }
//   }
//
//   getAllDevices(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const cognitoUser = this.userPool.getCurrentUser();
//       if (cognitoUser) {
//         cognitoUser.getSession((err: any, session: any) => {
//           if (err) {
//             reject(err);
//           } else {
//             cognitoUser.listDevices(10, this.paginationToken, {
//               onSuccess: function(result: string) {
//                 console.log('call result: ' + result);
//               },
//               onFailure: function(err: { message: any; }) {
//                 alert(err.message);
//               },
//             });
//           }
//         });
//       } else {
//         reject('No user');
//       }
//     });
//   }
//
//
//
//
//
//   getUserDetails(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const cognitoUser = this.userPool.getCurrentUser();
//       if (cognitoUser) {
//         cognitoUser.getSession((err: any, session: any) => {
//           if (err) {
//             reject(err);
//           } else {
//             cognitoUser.getUserAttributes((err: any, attributes: any) => {
//               if (err) {
//                 reject(err);
//               } else {
//                 const userDetails: any = {};
//                 for (let i = 0; i < attributes.length; i++) {
//                   userDetails[attributes[i].getName()] = attributes[i].getValue();
//                 }
//                 resolve(userDetails);
//               }
//             });
//           }
//         });
//       } else {
//         reject('No user');
//       }
//     });
//   }
// }

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
}
