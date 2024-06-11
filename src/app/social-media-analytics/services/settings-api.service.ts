// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign-analysis';

@Injectable({
  providedIn: 'root'
})

export class SettingsApiService {
  private apiUrl = 'http://127.0.0.1:8000/social-media/settings';

  constructor(private http: HttpClient) {}

  getKeywordAlerts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/keyword_alerts`);
  }

  getCampaigns(): Observable<any> {
    return this.http.get<{ [key: string]: Campaign[] }>(`${this.apiUrl}/get_campaign_details`)
  }

  getSentimentShift(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sentiment_shifts`);
  }

}