// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign-analysis';
import { socialMediaBackendAPI } from '../../app-settings/config';

@Injectable({
  providedIn: 'root'
})

export class SettingsApiService {
  private apiUrl = `${socialMediaBackendAPI}/social-media/settings`;

  constructor(private http: HttpClient) {}

  getTopicAlerts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product_alerts`);
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
    return this.http.post<any>(`${this.apiUrl}/set_campaign_details`, data);
  }
  

}