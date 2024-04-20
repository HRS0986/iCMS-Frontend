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

}
