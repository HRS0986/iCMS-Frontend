import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get('http://127.0.0.1:8000/CallAnalysis/Newnotification');
  }

  updateUnreadNotifications(notificationData: any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post('http://127.0.0.1:8000/CallAnalysis/Unreadpost', notificationData);
  }

  updateReadNotifications(notificationData: any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post('http://127.0.0.1:8000/CallAnalysis/Readpost', notificationData);
  }

  getReadNotifications(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get('http://127.0.0.1:8000/CallAnalysis/Readnotification');
  }

}
