import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeleteNotiSendingEmail, DeleteReadingEmail, EmailAcc, EmailAccWithNickName, EmailINtegrationPostResponseMessage, GetEditingEmailResponse, GetNewIntergratingEmailID, NotiSendingChannelsRecord, PostEditingEmail, PostNewIntegratingEmail, PostingCriticalityData, IssueInqTypeData, PostingNotiSendingChannelsRecord, PostingOverdueIssuesData, SSShiftData, SendSystemConfigData, UserRoleResponse } from '../../interfaces/settings';
import { URLS } from '../../services/app.constants'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  baseUrl: string = `${URLS.baseUrl}/settings`;
  


  //-------------------------------------------get dataservices  -------------------------------------------------------------

  
  getUserRoleData(token: string): Observable<UserRoleResponse > {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/get_user_role_data`;
    return this.http.get<UserRoleResponse>(url, {headers});
  
  }
  
  getData(): Observable<EmailAccWithNickName[]> {
    return this.http.get<EmailAccWithNickName[]>(`${this.baseUrl}/get_current_reading_emails`);
  }

  getEmailEditData(selectedEmail: string): Observable<GetEditingEmailResponse> {
    return this.http.get<GetEditingEmailResponse>(`${this.baseUrl}/get_editing_email_data?selectedEmail=${selectedEmail}`);
  }

  getCriticalityCheckingEmails(token:string): Observable<EmailAcc[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<EmailAcc[]>(`${this.baseUrl}/get_current_criticality_checking_emails`, {headers});
  
  }

  getOverdueIssuesCheckingEmails(token: string): Observable<EmailAcc[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<EmailAcc[]>(`${this.baseUrl}/get_current_overdue_issues_checking_emails`, {headers});
  
  }

  getSSCheckingData(token: string): Observable<SSShiftData> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<SSShiftData>(`${this.baseUrl}/get_current_ss_checking_data`, {headers});
  
  }

  getNotiChannelsData(token: string): Observable<NotiSendingChannelsRecord> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/get_noti_channels_data`;
    return this.http.get<NotiSendingChannelsRecord>(url, {headers});
  
  }


  getSystemConfigurationData(): Observable<SendSystemConfigData> {

    const url = `${this.baseUrl}/get_system_configuration_data`;
    return this.http.get<SendSystemConfigData>(url);
  
  }


  getNewIntegratingEmailID(): Observable<GetNewIntergratingEmailID> {

    const url = `${this.baseUrl}/get_new_intergrating_email_id`;
    return this.http.get<GetNewIntergratingEmailID>(url);
  
  }

  getIssueInqTypeData(): Observable<IssueInqTypeData> {

    const url = `${this.baseUrl}/get_issue_inq_type_data`;
    return this.http.get<IssueInqTypeData>(url);
  
  }
  


  //---------------------------------------------posting dataservices - onSubmit -------------------------------------------------------------
 
  postSSShiftData(token: string, formData: SSShiftData): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_trigger_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }

  postCriticalityData(token: string, formData: PostingCriticalityData): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_criticality_trigger_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }
  
  postNotificationChannelsData(token: string, formData: PostingNotiSendingChannelsRecord): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_notifications_channel_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }


  postIssuesOverdueData(token: string, formData: PostingOverdueIssuesData): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/receive_overdue_issue_trigger_data`;
    return this.http.post<any[]>(url, formData, { headers });  
  
  }

  
  postSystemConfigData(formData: SendSystemConfigData): Observable<any[]> {

    const url = `${this.baseUrl}/receive_system_configurations_data`;
    return this.http.post<any[]>(url, formData);  
  
  }

    
  postIssInqTypeData(formData: IssueInqTypeData): Observable<any[]> {

    const url = `${this.baseUrl}/receive_issue_inq_type_data`;
    return this.http.post<any[]>(url, formData);  
  
  }

  


  postEmailIntegration(formData: PostNewIntegratingEmail): Observable<EmailINtegrationPostResponseMessage> {

    const url = `${this.baseUrl}/receive_email_data`;
    return this.http.post<EmailINtegrationPostResponseMessage>(url, formData);  
  
  }
  
  postEmailEdit(formData: PostEditingEmail): Observable<EmailINtegrationPostResponseMessage> {

    const url = `${this.baseUrl}/receive_email_edit_data`;
    return this.http.post<EmailINtegrationPostResponseMessage>(url, formData);  
  
  }




  //-----------------------------------------deleting dataservices --------------------------------------------------------------

  deleteReadingEmail( sendingData: DeleteReadingEmail): Observable<any[]> {

    const url = `${this.baseUrl}/remove_reading_email`;
    return this.http.post<any[]>(url, sendingData);  
  
  }



  deleteNotiSendingEmail(token: string, sendingData: DeleteNotiSendingEmail): Observable<any[]> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/remove_noti_sending_email`;
    return this.http.post<any[]>(url, sendingData, { headers });  
  
  }
}






  



 
