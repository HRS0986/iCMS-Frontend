import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class RoleSettingsService {

  apiUrl = 'http://43.205.91.82:8000/UserGroups';

  constructor(private http: HttpClient ) { }

  getUserRoles(token: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers});
  }

  deleteUserRole(token: string, role: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(role);
    let params : HttpParams = new HttpParams().set('group_name', role);
    return this.http.delete<any>(this.apiUrl, {headers, params});
  }


}
