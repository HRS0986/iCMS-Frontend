import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../interfaces/summary';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchSummary(query: string):Observable<Summary[]>{
    return this.http.get<Summary[]>(`http://127.0.0.1:8000/email/summaries/search?query=${query}`);
  }
}
