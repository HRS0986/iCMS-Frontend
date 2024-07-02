import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { ApiResponse, OperatorListItem } from "../types";

@Injectable({
  providedIn: 'root'
})
export class CallOperatorService {

  constructor(private http: HttpClient) { }

  API_ROOT = "http://127.0.0.1:8000"

  public getAllOperators(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_ROOT + "/operators");
  }

  public getOperatorDetails(operatorId: number): Promise<ApiResponse> {
    const url = `${this.API_ROOT}/operators/${operatorId}`;
    debugger;
    return firstValueFrom(this.http.get<ApiResponse>(url));
  }

  public addOperator(operator: OperatorListItem): Promise<ApiResponse> {
    const token = this.getIdToken();
    console.log(token);
    const requestHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return firstValueFrom(this.http.post<ApiResponse>(this.API_ROOT + "/operators", operator, { headers: requestHeaders }));
  }

  public deleteOperator(operatorId: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.delete<ApiResponse>(this.API_ROOT + "/operators/" + operatorId));
  }

  public updateOperator(operator: OperatorListItem): Promise<ApiResponse> {
    return firstValueFrom(this.http.put<ApiResponse>(this.API_ROOT + "/operators", operator));
  }

  public getNextOperatorId(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(this.API_ROOT + "/operator-id"));
  }

  public getAllCallOperatorSentiments(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(this.API_ROOT + "/average-operator-sentiment"));
  }

  private getIdToken() {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    // Find the key that ends with 'idToken'
    const idTokenKey = keys.find(key => key.endsWith('idToken'));

    if (idTokenKey) {
      // Return the value associated with the idToken key
      return localStorage.getItem(idTokenKey);
    } else {
      console.log('idToken not found in localStorage');
      return null;
    }
  }

}
