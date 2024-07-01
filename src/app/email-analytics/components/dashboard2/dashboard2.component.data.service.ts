import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BestPerformingEmailAccResponse, EmailAccEfficiencyResponse, InquiriesByEfficiencyEffectivenessResponse, IssueInquiryFreqByProdcuts, IssueInquiryFreqByTypeResponse, IssuesByEfficiencyEffectivenessResponse, OngoingAndClosedStatsResponse, OverallyEfficiencyEffectivenessPecentagesResponse, OverdueIssuesResponse } from '../../interfaces/dashboard';
import { URLS } from '../../services/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = `${URLS.baseUrl}/dashboard`;

  getDataForStatCards(intervalIndays: number): Observable<OngoingAndClosedStatsResponse> {
    const url = `${this.baseUrl}/get_data_for_ongoing_and_closed_stats?intervalIndays=${intervalIndays}`;
    return this.http.get<OngoingAndClosedStatsResponse>(url);
  }

  getCurrentOverallEfficiencyandEffectiveness(intervalIndays: number): Observable<OverallyEfficiencyEffectivenessPecentagesResponse> {
    const url = `${this.baseUrl}/get_data_for_overall_efficiency_and_effectiveness_percentages?intervalIndays=${intervalIndays}`;
    return this.http.get<OverallyEfficiencyEffectivenessPecentagesResponse>(url);
  }


  getDataForEffiandEffecIssues(intervalIndays: number): Observable<IssuesByEfficiencyEffectivenessResponse> {
    const url = `${this.baseUrl}/get_data_for_issue_frequency_by_efficiency_and_effectiveness?intervalIndays=${intervalIndays}`;
    return this.http.get<IssuesByEfficiencyEffectivenessResponse>(url);
  }

  getDataForEffiandEffecInquiries(intervalIndays: number): Observable<InquiriesByEfficiencyEffectivenessResponse> {
    const url = `${this.baseUrl}/get_data_for_inquiry_frequency_by_efficiency_and_effectiveness?intervalIndays=${intervalIndays}`;
    return this.http.get<InquiriesByEfficiencyEffectivenessResponse>(url);
  }

  getDataForIssueandInquiryTypes(intervalIndays: number): Observable<IssueInquiryFreqByTypeResponse> {
    const url = `${this.baseUrl}/get_data_for_frequency_by_issue_type_and_inquiry_types?intervalIndays=${intervalIndays}`;
    return this.http.get<IssueInquiryFreqByTypeResponse>(url);
  }

  getDataForProductsByIssueandInquiry(intervalIndays: number): Observable<IssueInquiryFreqByProdcuts> {
    const url = `${this.baseUrl}/get_data_for_issue_and_inquiry_frequency_by_products?intervalIndays=${intervalIndays}`;
    return this.http.get<IssueInquiryFreqByProdcuts>(url);
  }
  
  getDataForEfficiencyByEmailAcc(intervalIndays: number): Observable<EmailAccEfficiencyResponse> {
    const url = `${this.baseUrl}/get_data_for_efficiency_by_email_acc?intervalIndays=${intervalIndays}`;
    return this.http.get<EmailAccEfficiencyResponse>(url);
  }


getBestPerformingEmail(intervalIndays: number): Observable<BestPerformingEmailAccResponse> {
  const url = `${this.baseUrl}/get_data_for_best_performing_email_acc?intervalIndays=${intervalIndays}`;
  return this.http.get<BestPerformingEmailAccResponse>(url);
}

getOverdueIssuesdata(intervalIndays: number): Observable<OverdueIssuesResponse> {
  const url = `${this.baseUrl}/get_data_for_overdue_issues?intervalIndays=${intervalIndays}`;
  return this.http.get<OverdueIssuesResponse>(url);
}




}