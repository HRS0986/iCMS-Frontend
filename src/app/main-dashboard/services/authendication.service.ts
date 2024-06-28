import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthendicationService {

  private baseUrl = 'http://127.0.0.1:8001/authendication';

  constructor(private http: HttpClient) { }

  login(login: any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post('http://127.0.0.1:8000/login', login);
  }

  userEmail(token: string): Observable<any> {
    console.log(token);
    return this.http.post('http://127.0.0.1:8002/charts/user_email', {'token':token});
  }

  signUp(signUp:any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post('http://127.0.0.1:8001/authendication/signup',signUp);
  }

  changePassword(changePassword: any,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
    });
    return this.http.put<any>(`${this.baseUrl}/ChangePassword`,changePassword, { headers });
    // Replace 'apiEndpoint' with your actual API endpoint
  }

  profileUpdate(profileUpdate: any,token: string): Observable<any> {
    console.log(profileUpdate);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
    });
    return this.http.put<any>(`${this.baseUrl}/ProfileUpdate`,profileUpdate, { headers });
    // Replace 'apiEndpoint' with your actual API endpoint
  }

  userDetails(token: string): Observable<any> {

    // Replace 'apiEndpoint' with your actual API endpoint
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
    });

    return this.http.get<any>(`${this.baseUrl}/user`, { headers });

  }

  addNewUser(newUser:any,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
    });
    return this.http.post<any>(`${this.baseUrl}/appsettting/users`,newUser, { headers });
    // Replace 'apiEndpoint' with your actual API endpoint

  }



}
