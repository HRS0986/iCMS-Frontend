import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private baseUrl = 'http://127.0.0.1:8002/charts';

  constructor(private http: HttpClient ) {}

  doughnutChart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/doughnutChart`);
  }

  lineChart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/lineChart`);
  }

}
