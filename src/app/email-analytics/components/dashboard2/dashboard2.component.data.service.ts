import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = 'http://127.0.0.1:8000/email/dashboard';

  getDataForStatCards(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_ongoing_and_closed_stats?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getCurrentOverallEfficiencyandEffectiveness(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_overall_efficiency_and_effectiveness_percentages?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }


  getDataForEffiandEffecIssues(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_issue_frequency_by_efficiency_and_effectiveness?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForEffiandEffecInquiries(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_inquiry_frequency_by_efficiency_and_effectiveness?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForIssueandInquiryTypes(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_frequency_by_issue_type_and_inquiry_types?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForProductsByIssueandInquiry(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_issue_and_inquiry_frequency_by_products?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }
  
  getDataForEfficiencyByEmailAcc(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_efficiency_by_email_acc?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForWordCloud(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_word_cloud?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }


 
  
  getDataForSentimentsByTime(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_time?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForSentimentsDistribtuionOfTopics(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_sentiments_distribution_of_topics?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }



getBestPerformingEmail(intervalIndays: number) {
  const url = `${this.baseUrl}/get_data_for_best_performing_email_acc?intervalIndays=${intervalIndays}`;
  return this.http.get<any[]>(url);
}

getOverdueIssuesdata(intervalIndays: number) {
  const url = `${this.baseUrl}/get_data_for_overdue_issues?intervalIndays=${intervalIndays}`;
  return this.http.get<any[]>(url);
}




}