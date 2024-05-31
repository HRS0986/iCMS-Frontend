import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';
import { MockSuggestionAdditionalDataResponse, MockSuggestionMetadataResponse, SuggestionAdditionalData, SuggestionMetaDataResponse } from '../interfaces/suggestions';
import { MockSuggestionMetadata } from '../interfaces/suggestions';


@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) { }

  private timeoutDuration = 5000; // Timeout duration in milliseconds

  // BUG: REMOVE in Production
  private convertToSuggestionResponse(mockedResponse: MockSuggestionMetadataResponse): SuggestionMetaDataResponse {
    const convertedData = mockedResponse.products.map((mockedSuggestion) => ({
      id: mockedSuggestion.id.toString(),
      suggestion: mockedSuggestion.title,
      isNew: Math.random() < 0.5,
      isPopular: Math.random() < 0.5,
      dateSuggested: new Date(new Date().valueOf() - Math.random()*(1e+9)),
      tags: mockedSuggestion.tags,
      sender: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
      recipient: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
    }));

    return {
      data: convertedData,
      total: mockedResponse.total,
      skip: mockedResponse.skip,
      limit: mockedResponse.limit,
    };
  }

  private convertToSuggestionAdditionalData(response: MockSuggestionAdditionalDataResponse): SuggestionAdditionalData {
    return {
      gibberish: response.body
    }
  }
  // ---

  getSuggestionMetadata(skip: number, limit: number): Observable<SuggestionMetaDataResponse> {
    return this.http
      .get<MockSuggestionMetadataResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .pipe(
        map(this.convertToSuggestionResponse),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );  // BUG: remove pipe in production
  }

  getSuggestionAdditionalData(suggestionId: string): Observable<SuggestionAdditionalData> {
    return this.http
      .get<MockSuggestionAdditionalDataResponse>(`https://dummyjson.com/posts/${suggestionId}`)
      .pipe(
        map(this.convertToSuggestionAdditionalData),
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