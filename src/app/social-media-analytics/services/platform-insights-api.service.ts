// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { socialMediaBackendAPI } from '../../app-settings/config';

@Injectable({
  providedIn: 'root'
})
export class PlatformInsightsApiService {
  private apiUrl = `${socialMediaBackendAPI}/social-media/platform-insights`;

  constructor(private http: HttpClient) {}

  getKeywordTrendCount(platform: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/keyword_trend_count?platform=${platform}&startDate=${startDate}&endDate=${endDate}`);
  }

  getTotalReactions(platform: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total_reactions?platform=${platform}&startDate=${startDate}&endDate=${endDate}`);
  }

  getTotalComments(platform: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total_comments?platform=${platform}&startDate=${startDate}&endDate=${endDate}`);
  }

  getHighlightedComments(platform: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/highlighted_comments?platform=${platform}&startDate=${startDate}&endDate=${endDate}`);
  }

  getAverageSentimentScore(platform: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/average_sentiment_score?platform=${platform}&startDate=${startDate}&endDate=${endDate}`);
  }

}