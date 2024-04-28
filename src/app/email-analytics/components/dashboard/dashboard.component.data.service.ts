import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  

  getCurrentOverallSentiments(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_current_overall_sentiments/${userId}`;
    return this.http.get<any[]>(url);
  }

  getDataForTopicsCloud(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_topic_cloud/${userId}`;
    return this.http.get<any[]>(url);
  }

  getDataForStatCards(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_stat_cards/${userId}`;
    return this.http.get<any[]>(url);
  }

  getDataForSentimentsByTopic(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_sentiments_by_topic/${userId}`;
    return this.http.get<any[]>(url);
  }

  
  getDataForSentimentsByTime(userId: number): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/dashboard/get_data_for_sentiments_by_time/${userId}`;
    return this.http.get<any[]>(url);
  }


}