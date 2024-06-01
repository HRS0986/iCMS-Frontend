import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InquiryMetaDataResponse, MockInquiryMetadataResponse, InquiryAdditionalData, MockInquiryAdditionalDataResponse } from '../interfaces/inquiries';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators'; // BUG: remove in production

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  // BUG: REMOVE in Production
  private convertToInquiryResponse(mockedResponse: MockInquiryMetadataResponse): InquiryMetaDataResponse {
    const convertedData = mockedResponse.products.map((mockedInquiry) => ({
      id: mockedInquiry.id.toString(),
      inquiry: mockedInquiry.title,
      inquiry_type: mockedInquiry.tags[0],
      status: Math.random() < 0.5 ? 'open' : 'answered',
      isNew: Math.random() < 0.5,
      isNewUpdate: Math.random() < 0.5,
      isAnswered: Math.random() < 0.5,
      dateInquired: new Date(new Date().valueOf() - Math.random()*(1e+9)), 
      dateAnswered: Math.random() < 0.5 ? new Date(new Date().valueOf() - Math.random()*(1e+8)) : undefined,
      lastUpdate: new Date(new Date().valueOf() - Math.random()*(1e+7)),
      tags: mockedInquiry.tags,
      sender: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
      recipient: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
      effectivity: Math.floor(1 + 5*Math.random()),
      efficiency: Math.floor(1 + 5*Math.random())
    }));
  
    return {
      data: convertedData,
      total: mockedResponse.total,
      skip: mockedResponse.skip,
      limit: mockedResponse.limit,
    };
  }

  private convertToInquiryAdditionalData(response: MockInquiryAdditionalDataResponse): InquiryAdditionalData {
    return {
      gibberish: response.body
    }
  }

  private timeoutDuration = 5000; // Timeout duration in milliseconds

  getInquiryMetadata(skip: number, limit: number): Observable<InquiryMetaDataResponse> {
    return this.http
      .get<MockInquiryMetadataResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .pipe(
        map(this.convertToInquiryResponse),
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

  getInquiryAdditionalData(id: string): Observable<InquiryAdditionalData> {
    return this.http
      .get<MockInquiryAdditionalDataResponse>(`https://dummyjson.com/posts/${id}`)
      .pipe(
        map(this.convertToInquiryAdditionalData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      ); // BUG: remove map part in production
  }
}
