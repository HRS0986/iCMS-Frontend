import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // TODO: remove in production
import { EmailMetadataResponse, MockEmailMetadataResponse } from '../interfaces/emails';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private http: HttpClient) { }

  // TODO: REMOVE in Production
  private convertToEmailResponse(mockedResponse: MockEmailMetadataResponse): EmailMetadataResponse {
    const convertedData = mockedResponse.data.map((mockedEmail) => ({
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
  // ---

  getEmailMetadata(skip: number, limit: number): Observable<EmailMetadataResponse> {
    return this.http
      .get<MockEmailMetadataResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .pipe(map(this.convertToEmailResponse));   // TODO: remove pipe in production
  }
}
