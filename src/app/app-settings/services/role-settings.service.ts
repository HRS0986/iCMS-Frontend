import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class RoleSettingsService {

  apiUrl = 'http://localhost:8000/getUserGroups';

  constructor(private http: HttpClient ) { }

  getUserRoles(token: string): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers});
  }


}
