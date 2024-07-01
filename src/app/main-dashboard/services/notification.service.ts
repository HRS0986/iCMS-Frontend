import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.asObservable();

  private baseUrl = 'http://3.108.227.179:8001/Notifications';

  constructor(private http: HttpClient) {
    this.connect();
  }

  private connect() {

    this.socket$ = webSocket(`${this.baseUrl}/ws`);

    this.socket$.subscribe(
      message => this.messagesSubject$.next(message),
      err => console.error(err),
      () => console.warn('Completed!')
    );
  }

  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    } else {
      // console.error('WebSocket is not connected');
    }
  }

  close() {
    if (this.socket$) {
      this.socket$.complete();
    } else {
      // console.error('WebSocket is not connected');
    }
  }


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
    return this.http.post<any>(`${this.baseUrl}/Unreadpost`,{"id":notificationData});
  }

  updateReadNotifications(notificationData: any): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.post<any>(`${this.baseUrl}/Readpost`,{"id":notificationData});
  }

  getReadNotifications(): Observable<any> {
    // Replace 'apiEndpoint' with your actual API endpoint
    return this.http.get<any>(`${this.baseUrl}/Readnotification`);
  }


}
