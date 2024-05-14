import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private baseUrl = 'http://127.0.0.1:8002/charts';
  private baseUrlUser = 'http://127.0.0.1:8001/authendication';
  
  constructor(private http: HttpClient ) {}

  doughnutChart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/doughnutChart`);
  }

  lineChart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/lineChart`);
  }

  newWidget(widgetData: any,token :string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(`${this.baseUrlUser}/newWidget`,widgetData,{headers});
  }
  
  allWidgets(token :string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>(`${this.baseUrl}/allWidgets`,{headers});
  }
  

}
