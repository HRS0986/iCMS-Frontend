import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval} from 'rxjs';
import { GaugeChartResponse, SentimentsByTimeResponse, SentimentsByTopicResponse, SentimentsDistributionByTimeResponse, get_current_overall_sentiments_response, stat_card_single_response, word_cloud_single_response } from '../interfaces/dashboard';
import { INTERVALS, URLS } from '../services/app.constants';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = `${URLS.baseUrl}/dashboard`;
  private pollingInterval: number = INTERVALS.pollingInterval;

  getCurrentOverallSentiments(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<get_current_overall_sentiments_response> {
    const url = `${this.baseUrl}/get_current_overall_sentiments?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<get_current_overall_sentiments_response>(url))
    );
  }

  getDataForTopicsCloud(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_topic_cloud?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<any[]>(url))
    );
  }

  getDataForWordCloud(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<word_cloud_single_response[]> {
    const url = `${this.baseUrl}/get_data_for_word_cloud?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<word_cloud_single_response[]>(url))
    );
  }

  getDataForStatCards(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<stat_card_single_response[]> {
    const url = `${this.baseUrl}/get_data_for_stat_cards?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<stat_card_single_response[]>(url))
    );
  }

  getDataForSentimentsByTopic(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<SentimentsByTopicResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_topic?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<SentimentsByTopicResponse>(url))
    );
  }

  
  getDataForSentimentsByTime(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<SentimentsByTimeResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_time?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<SentimentsByTimeResponse>(url))
    );
  }

  getDataForSentimentsDistribtuionOfTopics(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<SentimentsDistributionByTimeResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_distribution_of_topics?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<SentimentsDistributionByTimeResponse>(url))
    );
  }


  getDataForGaugeChart(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<GaugeChartResponse> {
  const url = `${this.baseUrl}/get_data_value_for_gauge_chart?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

  return interval(this.pollingInterval).pipe(
    switchMap(() => this.http.get<GaugeChartResponse>(url))
  );
  }




}