import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';
import { MockSuggestionMetadataResponse, SuggestionMetaDataResponse, SuggestionPopupData } from '../interfaces/suggestions';
import { Filter } from '../interfaces/filters';

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
  private convertToSuggestionAdditionalData(response: any): SuggestionPopupData {
    return {
      // gibberish: response.body
      emails: [
        "We are experiencing a critical issue in our production environment with the Mercury API. We are seeing extremely high latency and frequent 500 errors. This is causing major disruption to our services.\n\nWe are currently using Mercury language version 1.2.5 and our API is deployed on AWS.\n\nWe have checked our API logs and can't seem to pinpoint the root cause. The issue started around [mention approximate time] today.\n\nWe need immediate assistance to resolve this issue. Please contact us as soon as possible.", 
        "Dear John,\n\nThank you for contacting Aetheros Support. We understand the urgency of the issue you are experiencing with the Mercury API in your production environment.\n\nWe have escalated your case to our senior engineers who are investigating the issue.  To assist them in resolving this issue quickly, could you please provide us with the following information:\n\n* The specific endpoint(s) experiencing issues.\n* A copy of your API logs from the time the issue started.\n* Any recent changes made to your code or infrastructure.\n\nWe will keep you updated on our progress. In the meantime, please do not hesitate to contact us if you have any further questions.\n\nSincerely,\nAetheros Support Team", 
        "Hi,\n\nThanks for the quick response. \n\nThe endpoint experiencing the issue is: `/api/v2/processOrder`\n\nI've attached the relevant API logs. \n\nWe haven't made any recent changes to our code, but we did update our AWS load balancer configuration yesterday.\n\nLet me know if you need any further information.\n\nThanks,\nJohn", 
        "Our production environment is currently down. We are unable to access any of our instances and our monitoring tools are not providing any insights.\n\nWe are experiencing a complete outage and this is severely impacting our business operations. \n\nWe require immediate assistance to resolve this issue.\n\nPlease advise on the next steps ASAP.", 
        "Dear John,\n\nThank you for contacting Aetheros Support.\n\nWe understand that you are experiencing a critical issue with your production environment. Our team is currently investigating the issue and will provide an update as soon as possible. \n\nIn the meantime, could you please provide us with your Aetheros account ID and the approximate time the issue began?\n\nBest regards,\nAetheros Support Team", 
        "Our Aetheros Account ID is 857492 and the outage started around 08:05 AM UTC."
      ].map((email: any) => ({
        body: email,
        isClient: Math.random() < 0.5,
        dateTime: new Date(new Date().valueOf() - Math.random()*(1e+9))
      }))
    }
  }
  // ---
  getMockSuggestionData(filterCriteria: Filter, skip: number, limit: number): Observable<SuggestionMetaDataResponse> {
    let params = new HttpParams();
    if (filterCriteria.selectedSenders) {
      params = params.set('s', JSON.stringify(filterCriteria.selectedSenders));
    }
    if (filterCriteria.selectedReceivers) {
      params = params.set('r', JSON.stringify(filterCriteria.selectedReceivers));
    }
    if (filterCriteria.selectedTags) {
      params = params.set('tags', JSON.stringify(filterCriteria.selectedTags));
    }
    if (filterCriteria.reqAllTags !== undefined) {
      params = params.set('allTags', filterCriteria.reqAllTags.toString());
    }
    if (filterCriteria.selectedStatus) {
      params = params.set('status', JSON.stringify(filterCriteria.selectedStatus));
    }
    if (filterCriteria.selectedDate) {
      params = params.set('date', JSON.stringify(filterCriteria.selectedDate));
    }
    if (filterCriteria.searchText) {
      params = params.set('q', filterCriteria.searchText);
    }
    if (filterCriteria.importantOnly !== undefined) {
      params = params.set('important', filterCriteria.importantOnly.toString());
    }
    if (filterCriteria.newOnly !== undefined) {
      params = params.set('new', filterCriteria.newOnly.toString());
    }
    params = params.set('skip', skip.toString());
    params = params.set('limit', limit.toString());

    return this.http
      .get<MockSuggestionMetadataResponse>(`https://dummyjson.com/products/search`, { params })
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
      );
  }
  
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

  getSuggestionAdditionalData(suggestionId: string): Observable<SuggestionPopupData> {
    return this.http
      .get<any>(`https://dummyjson.com/posts/${suggestionId}`)
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