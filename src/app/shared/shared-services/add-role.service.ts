import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {apiEndpoint} from "../../app-settings/config";


@Injectable({
  providedIn: 'root'
})
export class AddRoleService {

  baseUrl = `${apiEndpoint}/createUserGroup`;


  constructor(private http: HttpClient) { }

  addRole(group_name: any, permissions: any, users: {user_name:string}[], token:string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(users)

    return this.http.post<any>(
      this.baseUrl,
      {
        group_name: group_name,
        permissions: permissions,
        users: users
      },
      {headers});
  }
}
