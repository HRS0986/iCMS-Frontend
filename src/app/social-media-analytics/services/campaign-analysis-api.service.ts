// src\app\social-media-analytics\services\campaign-analysis-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { socialMediaBackendAPI } from '../../app-settings/config';

@Injectable({
  providedIn: 'root'
})
export class CampaignAnalysisApiService {
  private apiUrl = `${socialMediaBackendAPI}/social-media/campaign-analysis`;

  constructor(private http: HttpClient) {}

  getCAData(sm_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/campaign_analysis_details?platform=${sm_id}`);
  }

}
