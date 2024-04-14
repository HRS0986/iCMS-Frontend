import { Injectable } from '@angular/core';
import { CallRecording } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallRecordingService {

  constructor(private http: HttpClient) {}

  public getRecentCalls(): CallRecording[] {
    return [
      {
        callUrl: 'lkhfdkghlkjs',
        title: 'Call Recording 01',
        date: new Date(),
        status: 'Positive'
      },
      {
        callUrl: 'lkhfdkghlkjs',
        title: 'Call Recording 02',
        date: new Date(),
        status: 'Positive'
      },
      {
        callUrl: 'lkhfdkghlkjs',
        title: 'Call Recording 04',
        date: new Date(),
        status: 'Neutral'
      },
      {
        callUrl: 'lkhfdkghlkjs',
        title: 'Call Recording 01',
        date: new Date(),
        status: 'Negative'
      },
      {
        callUrl: 'lkhfdkghlkjs',
        title: 'Call Recording 04',
        date: new Date(),
        status: 'Neutral'
      }
    ];
  }

  // CallRecordingService
  public uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>('http://127.0.0.1:8000/uploadcalls', formData);
  }
  public getCallsList(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get-calls-list');
  }
  public deleteCallsOfList(call_id: string, analytics_id: string): Observable<any> {
    // Constructing the URL with path parameters using /
    const url = `http://127.0.0.1:8000/delete-call-list/${call_id}&${analytics_id}`;
    console.log(call_id,analytics_id)
    // Using HTTP DELETE method
    return this.http.delete<any>(url);
  }

}
