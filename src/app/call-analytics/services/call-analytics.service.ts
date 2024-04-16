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

  public getCallStatistics(): CallStatistics {
    return {
      negativeCalls: 50,
      neutralCalls: 100,
      positiveCalls: 75,
      totalCalls: 225,
      averageCallTime: 10,
      totalMinutes: 1523
    };
  }

  public getOverallCallStatus() {

  }

  public getRecentCalls() {


  }

  public getOverallCallSentimentScore() {

  }

  public getSentimentTimeDetails() {

  }

  public getCallSummary(call_id: string): Promise<ApiResponse> {
    return firstValueFrom<ApiResponse>(this.http.get<ApiResponse>(`${this.API_ROOT}/get-call-summary/${call_id}`));
  }
}
