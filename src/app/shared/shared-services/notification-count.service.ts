import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationCountService {

  constructor(private http: HttpClient) {}

  getNotificationsCounts(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get('http://127.0.0.1:8000/CallAnalysis/NewnotificationCounts');
  }
}
