import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators'; // BUG: remove in production

import { EmailMetadataResponse, MockEmailMetadataResponse } from '../interfaces/emails';
import { ThreadSummaryResponse, MockThreadSummaryResponse } from '../interfaces/threads';
import { AllCompanyAddresses, AllStatus, AllTags, ClientAddresses } from '../interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  // BUG: REMOVE in Production
  private convertToEmailResponse(mockedResponse: MockEmailMetadataResponse): EmailMetadataResponse {
    const convertedData = mockedResponse.products.map((mockedEmail) => ({
      id: mockedEmail.id.toString(),
      subject: mockedEmail.title,
      sentiment: mockedEmail.rating.toString(),
      sender: "test",
      receiver: "test",
      date: "2020-10-10", 
      time: "10.10 PM",
      topics: ["CG", "VG"],
    }));
  
    return {
      data: convertedData,
      total: mockedResponse.total,
      skip: mockedResponse.skip,
      limit: mockedResponse.limit,
    };
  }

  // BUG: REMOVE in Production
  private convertToThreadResponse(mockedResponse: MockThreadSummaryResponse): ThreadSummaryResponse {
    const convertedData = mockedResponse.products.map((mockedThread) => ({
      id: mockedThread.id.toString(),
      subject: mockedThread.title,
      sentiment: mockedThread.rating.toString(),
      sender: "test",
      receiver: "test",
      date: "2020-10-10", 
      time: "10.10 PM",
      topics: ["CG", "VG"],
      summary: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis.",
    }));
  
    return {
      data: convertedData,
      total: mockedResponse.total,
      skip: mockedResponse.skip,
      limit: mockedResponse.limit,
    };
  }

  getThreadSummaries(skip: number, limit: number): Observable<ThreadSummaryResponse> {
    return this.http
      .get<MockThreadSummaryResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .pipe(map(this.convertToThreadResponse));   // BUG: remove pipe in production
  }

  getEmailMetadata(skip: number, limit: number): Observable<EmailMetadataResponse> {
    return this.http
      .get<MockEmailMetadataResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .pipe(map(this.convertToEmailResponse));   // BUG: remove pipe in production
  }

  baseUrlv2 = 'http://127.0.0.1:8000/email/v2';
  timeoutDuration = 5000;

  getTags(): Observable<AllTags> {
    return this.http
      .get<AllTags>(`${this.baseUrlv2}/filter/tags`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );
  }

  getStatus(): Observable<AllStatus> {
    return this.http
      .get<AllStatus>(`${this.baseUrlv2}/filter/status`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );
  }

  getCompanyAddresses(): Observable<AllCompanyAddresses> {
    return this.http
      .get<AllCompanyAddresses>(`${this.baseUrlv2}/filter/company-addresses`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );
  }

  getClientAddresses(): Observable<ClientAddresses> {
    return this.http
      .get<ClientAddresses>(`${this.baseUrlv2}/filter/client-addresses`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );
  }
}
