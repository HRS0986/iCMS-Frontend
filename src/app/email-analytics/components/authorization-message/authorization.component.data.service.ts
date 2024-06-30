import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from '../../services/app.constants';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = `${URLS.baseUrl}/info_and_retrieval`;
  

  getAuthorizationInfo(): Observable<any[]> {
    const url = `${this.baseUrl}/get_authorization_info`;
    return this.http.get<any[]>(url);
  }

 
 


}