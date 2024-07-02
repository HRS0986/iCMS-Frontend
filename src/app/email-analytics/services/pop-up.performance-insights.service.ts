import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { EmailAccEfficiencyResponse, InquiriesByEfficiencyEffectivenessResponse, IssuesByEfficiencyEffectivenessResponse, OngoingAndClosedStatsResponse, OverallyEfficiencyEffectivenessPecentagesResponse, OverdueIssuesResponse } from '../interfaces/dashboard';
import { INTERVALS, URLS } from '../services/app.constants';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = `${URLS.baseUrl}/dashboard`;
  private pollingInterval: number = INTERVALS.pollingInterval;

  getDataForStatCards(intervalIndays: number, intervalInDaysEnd: number): Observable<OngoingAndClosedStatsResponse> {
    const url = `${this.baseUrl}/get_data_for_ongoing_and_closed_stats?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<OngoingAndClosedStatsResponse>(url))
      );
  }

  getCurrentOverallEfficiencyandEffectiveness(intervalIndays: number, intervalInDaysEnd: number): Observable<OverallyEfficiencyEffectivenessPecentagesResponse> {
    const url = `${this.baseUrl}/get_data_for_overall_efficiency_and_effectiveness_percentages?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<OverallyEfficiencyEffectivenessPecentagesResponse>(url))
      );
  }


  getDataForEffiandEffecIssues(intervalIndays: number, intervalInDaysEnd: number): Observable<IssuesByEfficiencyEffectivenessResponse> {
    const url = `${this.baseUrl}/get_data_for_issue_frequency_by_efficiency_and_effectiveness?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<IssuesByEfficiencyEffectivenessResponse>(url))
      );
  }

  getDataForEffiandEffecInquiries(intervalIndays: number, intervalInDaysEnd: number): Observable<InquiriesByEfficiencyEffectivenessResponse> {
    const url = `${this.baseUrl}/get_data_for_inquiry_frequency_by_efficiency_and_effectiveness?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<InquiriesByEfficiencyEffectivenessResponse>(url))
      );
  }

  
  getDataForEfficiencyByEmailAcc(intervalIndays: number, intervalInDaysEnd: number): Observable<EmailAccEfficiencyResponse> {
    const url = `${this.baseUrl}/get_data_for_efficiency_by_email_acc?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<EmailAccEfficiencyResponse>(url))
      );
  }


getOverdueIssuesdata(intervalIndays: number, intervalInDaysEnd: number): Observable<OverdueIssuesResponse> {
  const url = `${this.baseUrl}/get_data_for_overdue_issues?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

  return interval(this.pollingInterval).pipe(
    startWith(0),
    switchMap(() => this.http.get<OverdueIssuesResponse>(url))
  );
}




}