import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { ApiResponse, CallOperator } from "../types";

@Injectable({
  providedIn: 'root'
})
export class CallOperatorService {

  constructor(private http: HttpClient) { }

  API_ROOT = "http://127.0.0.1:8000"

  public getAllOperators(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_ROOT + "/get-all-operators");
  }

  public getOperatorDetails(operatorId: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(this.API_ROOT + "/get-operator/" + operatorId));
  }

  public addOperator(operator: CallOperator): Promise<ApiResponse> {
    return firstValueFrom(this.http.post<ApiResponse>(this.API_ROOT + "/add-operator", operator));
  }

  public deleteOperator(operatorId: string): Promise<ApiResponse> {
    return firstValueFrom(this.http.delete<ApiResponse>(this.API_ROOT + "/delete-operator/" + operatorId));
  }

  public updateOperator(operator: CallOperator): Promise<ApiResponse> {
    return firstValueFrom(this.http.put<ApiResponse>(this.API_ROOT + "/update-operator", operator));
  }

  public getNextOperatorId(): Promise<ApiResponse> {
    return firstValueFrom(this.http.get<ApiResponse>(this.API_ROOT + "/get-operator-id"));
  }

}
