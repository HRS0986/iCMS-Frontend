import {Injectable} from '@angular/core';
import { ApiResponse, CallRecording, QueuedFile } from '../types';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  public uploadFiles(files: QueuedFile[]): Promise<ApiResponse|undefined> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file.file, file.file.name);
    });
    return this.http.post<ApiResponse>(`${this.API_ROOT}/upload-calls`, formData).toPromise();
  }

  public getCallsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_ROOT}/get-calls-list`);
  }

  public deleteCall(call_id: string): Observable<ApiResponse> {
    const url = `${this.API_ROOT}/delete-call/${call_id}`;
    return this.http.delete<ApiResponse>(url);
  }

}
