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
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/get-call-statistics`));
  }

  public getSentimentPercentages(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/get-sentiment-percentages`));
  }

  public getOperatorCallsOverTime(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/get-operator-calls-over-time`));
  }

  public getOverallCallStatus() {

  }


  public getOverallCallSentimentScore() {

  }

  public getSentimentTimeDetails() {

  }

  public getCallSummary(call_id: string): Promise<ApiResponse> {
    return firstValueFrom<ApiResponse>(this.http.get<ApiResponse>(`${this.API_ROOT}/get-call-summary/${call_id}`));
  }
}
