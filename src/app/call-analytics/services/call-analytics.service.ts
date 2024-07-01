import { Injectable } from '@angular/core';
import { ApiResponse, CallStatistics } from "../types";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CallAnalyticsService {

  API_ROOT = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) {
  }

  public getCallStatistics(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/call-statistics`));
  }

  public getSentimentPercentages(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/sentiment-percentages`));
  }

  public getOperatorCallsOverTime(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/operator-calls-over-time`));
  }

  public getTopicsDistribution(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/topics-distribution`));
  }


  public getOperatorRatings(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/operator-ratings`))
  }

  public getSentimentOverTime(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/sentiment-over-time?start=${start}&end=${end}`));
  }

  public getCallSummary(call_id: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/call-summary/${call_id}`));
  }

  public getAllKeywords(): Promise<ApiResponse> {
    return  firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/all-keywords`));
  }
}
