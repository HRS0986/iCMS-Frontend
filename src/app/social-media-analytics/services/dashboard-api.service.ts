// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { socialMediaBackendAPI } from '../../app-settings/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private apiUrl = `${socialMediaBackendAPI}/social-media/dashboard`;

  constructor(private http: HttpClient) {}

getFacebookAnalysisData(startDate:string,endDate:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/facebook_analysis_data?startDate=${startDate}&endDate=${endDate}`);
}


getProductTrendData(startDate:string,endDate:string):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/product_trend_data?startDate=${startDate}&endDate=${endDate}`);
}

getKeywordTrendData(startDate:string,endDate:string):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/keyword_trend_data?startDate=${startDate}&endDate=${endDate}`);
}

getSentimentPercentage():Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/get_setiment_percentage`);
  
}



 

}
