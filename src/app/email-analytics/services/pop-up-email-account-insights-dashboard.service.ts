import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { BestPerformingEmailAccResponse, EmailAccEfficiencyResponse, InquiriesByEfficiencyEffectivenessResponse, IssueInquiryFreqByProdcuts, IssueInquiryFreqByTypeResponse, IssuesByEfficiencyEffectivenessResponse, OngoingAndClosedStatsResponse, OverallyEfficiencyEffectivenessPecentagesResponse, OverdueIssuesResponse, stat_card_single_response } from '../interfaces/dashboard';
import { INTERVALS, URLS } from './app.constants';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = `${URLS.baseUrl}/dashboard`;
  private pollingInterval: number = INTERVALS.pollingInterval;


  
  getDataForEfficiencyByEmailAcc(intervalIndays: number, intervalInDaysEnd: number): Observable<EmailAccEfficiencyResponse> {
    const url = `${this.baseUrl}/get_data_for_efficiency_by_email_acc?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;
  
    return interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => this.http.get<EmailAccEfficiencyResponse>(url))
    );
  }

  getDataForStatCards(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<stat_card_single_response[]> {
    const url = `${this.baseUrl}/get_data_for_stat_cards?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => this.http.get<stat_card_single_response[]>(url))
    );
  }


getBestPerformingEmail(intervalIndays: number, intervalInDaysEnd: number): Observable<BestPerformingEmailAccResponse> {
  const url = `${this.baseUrl}/get_data_for_best_performing_email_acc?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;

  return interval(this.pollingInterval).pipe(
    startWith(0),
    switchMap(() => this.http.get<BestPerformingEmailAccResponse>(url))
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