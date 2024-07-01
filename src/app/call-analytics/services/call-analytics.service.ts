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

  public getCallStatistics(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/call-statistics?start=${start}&end=${end}`));
  }

  public getSentimentPercentages(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/sentiment-percentages?start=${start}&end=${end}`));
  }

  public getOperatorCallsOverTime(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/operator-calls-over-time?start=${start}&end=${end}`));
  }

  public getTopicsDistribution(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/topics-distribution?start=${start}&end=${end}`));
  }


  public getOperatorRatings(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/operator-ratings?start=${start}&end=${end}`))
  }

  public getSentimentOverTime(start: string,  end: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/sentiment-over-time?start=${start}&end=${end}`));
  }

  public getCallSummary(call_id: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/call-summary/${call_id}`));
  }

  public getAllKeywords(start: string,  end: string): Promise<ApiResponse> {
    return  firstValueFrom(this.http.get<ApiResponse>(`${this.API_ROOT}/all-keywords?start=${start}&end=${end}`));
  }
}
