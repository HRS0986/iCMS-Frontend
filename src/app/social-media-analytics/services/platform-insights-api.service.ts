// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformInsightsApiService {
  private apiUrl = 'http://127.0.0.1:8000/social-media/platform-insights';

  constructor(private http: HttpClient) {}

  getKeywordTrendCount(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/keyword_trend_count?startDate=${startDate}&endDate=${endDate}`);
  }

  getTotalReactions(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total_reactions?startDate=${startDate}&endDate=${endDate}`);
  }

  getTotalComments(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total_comments?startDate=${startDate}&endDate=${endDate}`);
  }

  getHighlightedComments(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/highlighted_comments?startDate=${startDate}&endDate=${endDate}`);
  }

  getAverageSentimentScore(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/average_sentiment_score?startDate=${startDate}&endDate=${endDate}`);
  }

}