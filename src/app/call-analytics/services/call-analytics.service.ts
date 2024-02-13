import { Injectable } from '@angular/core';
import { CallStatistics } from "../types";

@Injectable({
  providedIn: 'root'
})
export class CallAnalyticsService {

  constructor() { }

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
}
