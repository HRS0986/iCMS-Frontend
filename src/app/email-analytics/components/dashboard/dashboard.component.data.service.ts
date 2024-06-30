import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GaugeChartResponse, SentimentsByTimeResponse, SentimentsByTopicResponse, SentimentsDistributionByTimeResponse, get_current_overall_sentiments_response, stat_card_single_response, word_cloud_single_response } from '../../interfaces/dashboard';
import { URLS } from '../../services/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = `${URLS.baseUrl}/dashboard`;

  getCurrentOverallSentiments(intervalIndays: number): Observable<get_current_overall_sentiments_response> {
    const url = `${this.baseUrl}/get_current_overall_sentiments?intervalIndays=${intervalIndays}`;
    return this.http.get<get_current_overall_sentiments_response>(url);
  }

  getDataForTopicsCloud(intervalIndays: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_topic_cloud?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForWordCloud(intervalIndays: number): Observable<word_cloud_single_response[]> {
    const url = `${this.baseUrl}/get_data_for_word_cloud?intervalIndays=${intervalIndays}`;
    return this.http.get<word_cloud_single_response[]>(url);
  }

  getDataForStatCards(intervalIndays: number): Observable<stat_card_single_response[]> {
    const url = `${this.baseUrl}/get_data_for_stat_cards?intervalIndays=${intervalIndays}`;
    return this.http.get<stat_card_single_response[]>(url);
  }

  getDataForSentimentsByTopic(intervalIndays: number): Observable<SentimentsByTopicResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_topic?intervalIndays=${intervalIndays}`;
    return this.http.get<SentimentsByTopicResponse>(url);
  }

  
  getDataForSentimentsByTime(intervalIndays: number): Observable<SentimentsByTimeResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_time?intervalIndays=${intervalIndays}`;
    return this.http.get<SentimentsByTimeResponse>(url);
  }

  getDataForSentimentsDistribtuionOfTopics(intervalIndays: number): Observable<SentimentsDistributionByTimeResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_distribution_of_topics?intervalIndays=${intervalIndays}`;
    return this.http.get<SentimentsDistributionByTimeResponse>(url);
  }


getDataForGaugeChart(intervalIndays: number): Observable<GaugeChartResponse> {
  const url = `${this.baseUrl}/get_data_value_for_gauge_chart?intervalIndays=${intervalIndays}`;
  return this.http.get<GaugeChartResponse>(url);
}




}