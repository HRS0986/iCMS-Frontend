import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { SentimentsByTopicResponse, SentimentsDistributionByTimeResponse, word_cloud_single_response } from '../interfaces/dashboard';
import { URLS } from '../services/app.constants';
import { INTERVALS } from '../services/app.constants';
import { IssueInquiryFreqByProdcuts } from '../interfaces/dashboard';
import { startWith, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = `${URLS.baseUrl}/dashboard`;
  private pollingInterval: number = INTERVALS.pollingInterval;

  getDataForTopicsCloud(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<any[]> {
    const url = `${this.baseUrl}/get_data_for_topic_cloud?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
       startWith(0),
        switchMap(() => this.http.get<any[]>(url))
      );
  }

  getDataForWordCloud(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<word_cloud_single_response[]> {
    const url = `${this.baseUrl}/get_data_for_word_cloud?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;
   
    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<word_cloud_single_response[]>(url))
      );
  }


  getDataForSentimentsByTopic(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<SentimentsByTopicResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_by_topic?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;
    
    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<SentimentsByTopicResponse>(url))
      );

  }

  getDataForSentimentsDistribtuionOfTopics(intervalInDaysStart: number, intervalInDaysEnd: number): Observable<SentimentsDistributionByTimeResponse> {
    const url = `${this.baseUrl}/get_data_for_sentiments_distribution_of_topics?intervalInDaysStart=${intervalInDaysStart}&intervalInDaysEnd=${intervalInDaysEnd}`;

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<SentimentsDistributionByTimeResponse>(url))
      );
  }

  getDataForProductsByIssueandInquiry(intervalIndays: number, intervalInDaysEnd: number): Observable<IssueInquiryFreqByProdcuts> {
    
    
    const url = `${this.baseUrl}/get_data_for_issue_and_inquiry_frequency_by_products?intervalInDaysStart=${intervalIndays}&intervalInDaysEnd=${intervalInDaysEnd}`;
    this.http.get<IssueInquiryFreqByProdcuts>(url);

    return interval(this.pollingInterval).pipe(
      startWith(0),
        switchMap(() => this.http.get<IssueInquiryFreqByProdcuts>(url))
      );
  }




}