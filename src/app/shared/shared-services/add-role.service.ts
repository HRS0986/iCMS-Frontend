import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddRoleService {

  baseUrl = 'http://127.0.0.1:8000/createUserGroup';


  constructor(private http: HttpClient) { }

  addRole(group_name: any, permissions: any, token: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(permissions)
    return this.http.post<any>(
      this.baseUrl,
      {
        group_name: group_name,
        permissions: permissions,
      },
      {headers});
  }
}
