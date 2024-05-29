import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // BUG: remove in production

import { EmailMetadataResponse, MockEmailMetadataResponse } from '../interfaces/emails';
import { ThreadSummaryResponse, MockThreadSummaryResponse } from '../interfaces/threads';

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

}
