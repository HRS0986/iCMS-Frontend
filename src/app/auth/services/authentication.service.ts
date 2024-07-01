// authentication.service.ts
import { Injectable } from '@angular/core';
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserPool} from 'amazon-cognito-identity-js';
import { environment } from "../../../environment/environment";
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
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

  userIp: string = '';

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

    // this.userIp = this.getUserIp();
    console.log(this.userIp);

    this.loadPermissions(); // Load permissions on initialization
  }

  public get currentUserValue(): CognitoUser | null {
    return this.currentUserSubject.value;
  }



  signIn(username: string, password: string): Observable<any> {

    return this.http.get<{ ip: string }>('https://api64.ipify.org?format=json').pipe(
      switchMap(data => {
        const Ip = data.ip;
        console.log(Ip);
        const authenticationDetails = new AuthenticationDetails({
          Username: username,
          Password: password,
          ClientMetadata: {
            ip: Ip
          }
        });
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: this.userPool,
        });

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
      })
    );
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






