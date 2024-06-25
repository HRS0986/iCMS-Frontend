import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://127.0.0.1:8000/Notifications';
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get<any>(`${this.baseUrl}/Newnotification`);
  }

  getNotificationsCounts(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get<any>(`${this.baseUrl}/NewnotificationCounts`);
  }

  updateUnreadNotifications(notificationData: any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post<any>(`${this.baseUrl}/Unreadpost`,notificationData);
  }

  updateReadNotifications(notificationData: any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post<any>(`${this.baseUrl}/Readpost`,notificationData);
  }

  getReadNotifications(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get<any>(`${this.baseUrl}/Readnotification`);
  }

}
