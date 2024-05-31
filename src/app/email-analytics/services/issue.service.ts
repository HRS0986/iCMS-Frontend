import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueMetaDataResponse, MockIssueMetadataResponse, IssueAdditionalData, MockIssueAdditionalDataResponse } from '../interfaces/issues';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators'; // BUG: remove in production


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  // BUG: REMOVE in Production
  private convertToIssueResponse(mockedResponse: MockIssueMetadataResponse): IssueMetaDataResponse {
    const convertedData = mockedResponse.products.map((mockedIssue) => ({
      id: mockedIssue.id.toString(),
      issue: mockedIssue.title,
      isNew: Math.random() < 0.5,
      isClosed: Math.random() < 0.5,
      isOverdue: Math.random() < 0.5,
      sender: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
      recipient: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
      dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)), 
      dateClosed: new Date(new Date().valueOf() - Math.random()*(1e+8)),
      tags: mockedIssue.tags,
      efficiency: Math.floor(1 + 5*Math.random()),
      effectivity: Math.floor(1 + 5*Math.random())
    }));
  
    return {
      data: convertedData,
      total: mockedResponse.total,
      skip: mockedResponse.skip,
      limit: mockedResponse.limit,
    };
  }


  private convertToIssueAdditionalData(response: MockIssueAdditionalDataResponse): IssueAdditionalData {
    return {
      gibberish: response.body
    }
  }
  // ---
  private timeoutDuration = 5000; // Timeout duration in milliseconds

  getIssueMetadata(skip: number, limit: number): Observable<IssueMetaDataResponse> {
    return this.http
      .get<MockIssueMetadataResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .pipe(
        map(this.convertToIssueResponse),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );   // BUG: remove map part in production
  }

  getIssueAdditionalData(issueId: string): Observable<IssueAdditionalData> {
    return this.http
      .get<MockIssueAdditionalDataResponse>(`https://dummyjson.com/posts/${issueId}`)
      .pipe(
        map(this.convertToIssueAdditionalData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );  // BUG: remove map part in production
  }
}
