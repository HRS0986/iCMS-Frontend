// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign-analysis';

const headers = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {
  private apiUrl = 'http://127.0.0.1:8000/social-media/settings';

  constructor(private http: HttpClient) {}

  getTopicAlerts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/topic_alerts`);
  }

  getCampaigns(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/campaigns`);
  }

  getSentimentShift(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sentiment_shifts`);
  }

  setSentimentShift(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sentiment_shifts`, data);
  }
  setKeywordAlerts(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/keyword_alerts`, data);
  }

  setCampaigns(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/social-media/campaign-analysis/create-campaign', data, { headers: headers });
  }
  setTopicAlerts(data: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/social-media/settings/add_topic_alert`, data, { headers: headers });
  }
  setThresold(data: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/social-media/settings/add_sentiment_shift_threshold`, data, { headers: headers });
  }

}