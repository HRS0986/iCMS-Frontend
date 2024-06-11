import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserChangePasswordService {

  apiUrl = 'http://43.205.91.82:8000/changePassword';

  constructor(private http: HttpClient) { }

  changePassword(token: string, currentPassword:any, newPassword: any): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    //application/json
    return this.http.post(this.apiUrl, {
      current_password: currentPassword,
      new_password: newPassword
    }, { headers });
  }
}
