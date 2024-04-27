import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/email/settings/get_current_reading_emails');
  }

  getCriticalityCheckingEmails(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/email/settings/get_current_criticality_checking_emails');
  
  }

  getSSCheckingEmails(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/email/settings/get_current_ss_checking_emails');
  
  }

  getNotiChannelsData(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/settings/get_noti_channels_data/1`;
    return this.http.get<any[]>(url);
  
  }

}






  



 
