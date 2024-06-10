import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  apiUrl = 'http://localhost:8000/getUserProfileData';

  constructor(private http: HttpClient) { }

  getUserProfileData(token: string): any {
    // console.log(token);
    let headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers});

  }




}
