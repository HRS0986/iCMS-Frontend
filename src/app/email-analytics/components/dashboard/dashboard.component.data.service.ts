import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = 'http://127.0.0.1:8000/email/dashboard';

  getCurrentOverallSentiments(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_current_overall_sentiments?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForTopicsCloud(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_topic_cloud?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForWordCloud(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_word_cloud?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForStatCards(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_stat_cards?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForSentimentsByTopic(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_topic?intervalIndays=${intervalIndays}`;
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


getDataForGaugeChart(intervalIndays: number) {
  const url = `${this.baseUrl}/get_data_value_for_gauge_chart?intervalIndays=${intervalIndays}`;
  return this.http.get<any[]>(url);
}




}