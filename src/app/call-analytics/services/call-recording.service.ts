import { Injectable } from '@angular/core';
import { ApiResponse, CallRecording, QueuedFile } from '../types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Header } from 'primeng/api';
interface Topic {
  name: string;
  code: string;
}


@Injectable({
  providedIn: 'root'
})
export class CallRecordingService {

  constructor(private http: HttpClient) {
  }

  API_ROOT = "http://127.0.0.1:8000";

  public getRecentCalls(): CallRecording[] {
    return [
      {id: "cr_0", operator_id:0, description: "Call Recording Title2", date: new Date(), duration: 3.7, sentiment: "Positive", callUrl: "dumyy url", transcription: "dummy transcription"},
      {id: "cr_1", operator_id:0, description: "Call Recording Title3", date: new Date(), duration: 3.7, sentiment: "Negative", callUrl: "dumyy url", transcription: "dummy transcription"},
      {id: "cr_2", operator_id:0, description: "Call Recording Title4", date: new Date(), duration: 3.7, sentiment: "Neutral", callUrl: "dumyy url", transcription: "dummy transcription"},
      {id: "cr_3", operator_id:0, description: "Call Recording Title5", date: new Date(), duration: 3.7, sentiment: "Negative", callUrl: "dumyy url", transcription: "dummy transcription"},
      {id: "cr_4", operator_id:0, description: "Call Recording Title6", date: new Date(), duration: 3.7, sentiment: "Positive", callUrl: "dumyy url", transcription: "dummy transcription"},
    ];
  }

  public uploadFile(file: QueuedFile): Observable<ApiResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file.file, file.file.name);
    return this.http.post<ApiResponse>(`${this.API_ROOT}/upload-calls`, formData);
  }

  public getCallsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_ROOT}/get-calls-list`);
  }

  public deleteCall(call_id: string): Observable<ApiResponse> {
    const url = `${this.API_ROOT}/delete-call/${call_id}`;
    return this.http.delete<ApiResponse>(url);
  }

  public applyFeatures(duration: number, keyword: string[], sentiment_category: string, start_date: string, end_date: string, topics: Topic): Observable<ApiResponse> {
    const url = `${this.API_ROOT}/filter-calls/`;
    const body = { start_date, end_date, keyword, duration, sentiment_category,topics};

    // Define HTTP Headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'value'  // Example custom header
      // Add more headers if needed
    });

    // Options including headers
    const options = {
      headers: headers
    };

    console.log(url);
    // Ensure to return the Observable from the HTTP POST request
    return this.http.post<ApiResponse>(url, body, options);
}

    
}