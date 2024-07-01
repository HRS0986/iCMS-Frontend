import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {apiEndpoint} from "../config";


@Injectable({
  providedIn: 'root'
})

export class RoleSettingsService {

  apiUrl = `${apiEndpoint}`;

  constructor(private http: HttpClient ) { }

  getUserRoles(token: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl+'/UserGroups', {headers});
  }

  getRoleDetails(token: string, role: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let params : HttpParams = new HttpParams().set('group_name', role);
    return this.http.get<any>(this.apiUrl+'/getGroupDetails', {headers, params});
  }

  deleteUserRole(token: string, role: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(role);
    let params : HttpParams = new HttpParams().set('group_name', role);
    return this.http.delete<any>(this.apiUrl+'/UserGroups', {headers, params});
  }

  addUser(token: string, userName: string, password: string, email: string, phoneNumber: string, roles: { group_name: string, number_of_users: number }[]): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let role_list = roles.map(role => role.group_name);
    let body = {
      username:userName,
      password:password,
      email:email,
      phone_number:phoneNumber,
      roles:role_list
    };
    return this.http.post<any>(this.apiUrl+'/newUser', body, {headers});
  }

  updateUser(token: string, userName: string, email: string, phoneNumber: string, roles: { group_name: string, number_of_users: number }[]): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let role_list = roles.map(role => role.group_name);
    let body = {
      username:userName,
      email:email,
      phone_number:phoneNumber,
      roles:role_list
    };
    return this.http.put<any>(this.apiUrl+'/updateUser', body, {headers});
  }



}
