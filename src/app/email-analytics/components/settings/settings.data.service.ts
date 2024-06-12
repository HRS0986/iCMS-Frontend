import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  private baseUrl: string = 'http://127.0.0.1:8000/email/settings';
  
  getUserRoleData(token: string): Observable<any[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/get_user_role_data`;
    return this.http.get<any[]>(url, {headers});
  
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_current_reading_emails`);
  }

  getCriticalityCheckingEmails(token:string): Observable<any[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/get_current_criticality_checking_emails`, {headers});
  
  }

  getOverdueIssuesCheckingEmails(token: string): Observable<any[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/get_current_overdue_issues_checking_emails`, {headers});
  
  }

  getSSCheckingData(token: string): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/get_current_ss_checking_data`, {headers});
  
  }

  getNotiChannelsData(token: string): Observable<any[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/get_noti_channels_data`;
    return this.http.get<any[]>(url, {headers});
  
  }


  getSystemConfigurationData(): Observable<any[]> {

    const url = `${this.baseUrl}/get_system_configuration_data`;
    return this.http.get<any[]>(url);
  
  }
  
  postSSShiftData(token: string, formData: any): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_trigger_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }

  postCriticalityData(token: string, formData: any): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_criticality_trigger_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }
  
  postNotificationChannelsData(token: string, formData: any): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_notifications_channel_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }


  postIssuesOverdueData(formData: any): Observable<any[]> {

    const url = `${this.baseUrl}/receive_overdue_issue_trigger_data`;
    return this.http.post<any[]>(url, formData);  
  
  }

  
  postSystemConfigData(formData: any): Observable<any[]> {

    const url = `${this.baseUrl}/receive_system_configurations_data`;
    return this.http.post<any[]>(url, formData);  
  
  }

  deleteNotiSendingEmail(token: string, sendingData: any): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/remove_noti_sending_email`;
    return this.http.post<any[]>(url, sendingData, { headers });  
  
  }
}






  



 
