import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  

  getAuthorizationInfo(): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/info_and_retrieval/get_authorization_info`;
    return this.http.get<any[]>(url);
  }

 
 


}