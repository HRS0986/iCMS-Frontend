import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiEndpoint} from "../../app-settings/config";

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  apiUrl = `${apiEndpoint}`;

  constructor(private http: HttpClient) { }

  getUserProfileData(token: string): any {
    // console.log(token);
    let headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl+'/getUserProfileData', {headers});

  }





}
