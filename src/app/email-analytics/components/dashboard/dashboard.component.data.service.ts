import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  

  getCurrentOverallSentiments(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_current_overall_sentiments/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForTopicsCloud(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_topic_cloud/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForWordCloud(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_word_cloud/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForStatCards(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_stat_cards/${userId}?intervalIndays=${intervalIndays}`;
    return this.http.get<any[]>(url);
  }

  getDataForSentimentsByTopic(userId: number, intervalIndays: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_sentiments_by_topic/${userId}?intervalIndays=${intervalIndays}`;
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

getDataForGaugeChart(userId: number, intervalIndays: number) {
  const url = `http://127.0.0.1:8000/email/dashboard/get_data_value_for_gauge_chart/${userId}?intervalIndays=${intervalIndays}`;
  return this.http.get<any[]>(url);
}




}