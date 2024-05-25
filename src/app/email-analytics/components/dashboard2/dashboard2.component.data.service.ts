import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  

  getDataForStatCards(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_ongoing_and_closed_stats/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getCurrentOverallEfficiencyandEffectiveness(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_overall_efficiency_and_effectiveness_percentages/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }


  getDataForEffiandEffecIssues(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_issue_frequency_by_efficiency_and_effectiveness/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForEffiandEffecInquiries(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_inquiry_frequency_by_efficiency_and_effectiveness/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForIssueandInquiryTypes(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_frequency_by_issue_type_and_inquiry_types/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForProductsByIssueandInquiry(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_issue_and_inquiry_frequency_by_products/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }
  
  getDataForEfficiencyByEmailAcc(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_efficiency_by_email_acc/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForWordCloud(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_word_cloud/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }


 
  
  getDataForSentimentsByTime(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_sentiments_by_time/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForSentimentsDistribtuionOfTopics(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_sentiments_distribution_of_topics/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

//   getDataForGaugeChart(userId: number, intervalIndays: number) {
//     const url = `http://127.0.0.1:8000/email/dashboard/get_data_value_for_gauge_chart/${userId}/${intervalIndays}`;
//     return this.http.get<any[]>(url);
// }

getBestPerformingEmail(userId: number, intervalIndays: number) {
  const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_best_performing_email_acc/${userId}?intervalIndays=${intervalIndays}`;
  return this.http.get<any[]>(url);
}




}