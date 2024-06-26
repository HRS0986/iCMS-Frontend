// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignAnalysisApiService {
  private apiUrl = 'http://127.0.0.1:8000/social-media';

  constructor(private http: HttpClient) {}

  getPIData(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/platform_insights_data?startDate=${startDate}&endDate=${endDate}`);
  }

}
