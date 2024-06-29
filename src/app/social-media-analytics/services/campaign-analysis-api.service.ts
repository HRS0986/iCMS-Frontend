// src\app\social-media-analytics\services\campaign-analysis-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignAnalysisApiService {
  private apiUrl = 'http://127.0.0.1:8000/social-media/campaign-analysis';

  constructor(private http: HttpClient) {}

  getCAData(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/campaign_analysis_details?startDate=${startDate}&endDate=${endDate}`);
  }

}
