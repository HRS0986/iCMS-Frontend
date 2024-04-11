import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Summary, EmailThread } from '../interfaces/summary';

@Injectable({
  providedIn: 'root'
})

export class SummaryService {

  constructor(private http: HttpClient) { }

  getSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>('http://127.0.0.1:8000/email/summaries');
  }
  getThread(id: string): Observable<EmailThread> {
    return this.http.get<EmailThread>(`http://127.0.0.1:8000/email/summaries/${id}`);
  }

}
