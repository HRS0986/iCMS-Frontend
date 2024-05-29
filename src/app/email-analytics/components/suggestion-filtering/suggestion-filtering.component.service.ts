import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getDataForFilterSuggestions(intervalIndays: number, product: string, recepient: string): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/suggestion-filtering/get_filtered_suggestions?intervalIndays=${intervalIndays}&product=${product}&recepient=${recepient}`;
    return this.http.get<any[]>(url);
  }

  getAllRecepients(): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/suggestion-filtering/get_all_recepients`;
    return this.http.get<any[]>(url);
  }

  getAllProducts(): Observable<any[]> {
    const url = `http://127.0.0.1:8000/email/suggestion-filtering/get_all_products`;
    return this.http.get<any[]>(url);
  }


}