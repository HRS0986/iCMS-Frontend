import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiEndpoint} from "../config";

@Injectable({
  providedIn: 'root'
})
export class RoleUpdateService {
  apiUrl = `${apiEndpoint}`;

  roleToUpdate = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  updateRole(token: string, roleData: any) {
    // console.log(roleData);

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let body = {
      group_name: roleData.group_name,
      permissions: roleData.permissions
    };
    console.log(body)
    return this.http.put<any>(this.apiUrl+'/updateRole', body, {headers});
  }
}
