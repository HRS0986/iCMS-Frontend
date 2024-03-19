import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Summary } from '../interfaces/summary';

@Injectable({
  providedIn: 'root'
})

export class SummaryService {

  constructor(private http: HttpClient) { }

  getSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>('http://127.0.0.1:8000/email/summaries');
  }
  getSummary(): Observable<Summary> {
    return this.http.get<Summary>('http://127.0.0.1:8000/email/summaries/1');
  }
}
