import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiEndpoint} from "../../app-settings/config";

@Injectable({
  providedIn: 'root'
})
export class UserChangePasswordService {

  apiUrl = `${apiEndpoint}/changePassword`;

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
