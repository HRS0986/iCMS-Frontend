import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Issue, IssueMetaDataResponse, IssuePopupData, MockIssueMetadata, MockIssueMetadataResponse } from '../interfaces/issues';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators'; // BUG: remove in production
import { Filter } from '../interfaces/filters';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient, private utility: UtilityService) { }

  // BUG: REMOVE in Production


  private convertToIssueResponse(mockedResponse: MockIssueMetadataResponse): IssueMetaDataResponse {

    const randomData = (mockedIssue: MockIssueMetadata): Issue => {
      const status: Issue['status'][] = ['New', 'Waiting', 'Update', 'Closed'];
      const randomStatus: Issue['status'] = status[Math.floor(Math.random()*status.length)];
      if (randomStatus === 'Closed') {
        const dateClosed = new Date(new Date().valueOf() - Math.random()*(1e+8));
        const efficiency = Math.floor(1 + 5*Math.random());
        const effectivity = Math.floor(1 + 5*Math.random());
    
        return {
          id: mockedIssue.id.toString(),
          issue: mockedIssue.title,
          status: randomStatus,
          sender: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
          recipient: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
          dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)),
          dateClosed: dateClosed,
          tags: mockedIssue.tags,
          effectivity: effectivity,
          efficiency: efficiency
        };
      }
      return {
        id: mockedIssue.id.toString(),
        issue: mockedIssue.title,
        isOverdue: Math.random() < 0.5,
        status: randomStatus,
        sender: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
        recipient: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
        dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)),
        dateUpdate: new Date(new Date().valueOf() - Math.random()*(1e+7)),
        tags: mockedIssue.tags,
      };
    }

    const convertedData = mockedResponse.products.map((mockedIssue) => (randomData(mockedIssue)));
    // const status: Issue['status'][] = ['New', 'Waiting', 'Update', 'Closed'];

    // const convertedData = mockedResponse.products.map((mockedIssue) => ({
    //   id: mockedIssue.id.toString(),
    //   issue: mockedIssue.title,
    //   isOverdue: Math.random() < 0.5,
    //   status: status[Math.floor(Math.random()*status.length)],
    //   sender: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
    //   recipient: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
    //   dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)),
    //   tags: mockedIssue.tags,
    // }));
    return {
      data: convertedData,
      total: mockedResponse.total,
      skip: mockedResponse.skip,
      limit: mockedResponse.limit,
    };
  }

  private convertToIssueAdditionalData(response: any): IssuePopupData {
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
  private timeoutDuration = 5000; // Timeout duration in milliseconds

  baseUrl = 'http://127.0.0.1:8000'; // Base URL for the API
  baseUrlv2 = 'http://127.0.0.1:8000/email/v2'; // Base URL for the API version 2

  getIssueData(filterCriteria: Filter, skip: number, limit: number): Observable<IssueMetaDataResponse> {
    const params = this.utility.buildFilterParams(filterCriteria, limit, skip);
    return this.http
      .get<IssueMetaDataResponse>(`${this.baseUrlv2}/issues?${params}`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown data service error has occured. Please try again later." + e.message + "\n" + e.name + "\n" + e.stack));
          }
        })
      );
  }

  getMockIssueData(filterCriteria: Filter, skip: number, limit: number): Observable<IssueMetaDataResponse> {
    return this.http
      .get<MockIssueMetadataResponse>(`https://dummyjson.com/products/?limit=${limit}&skip=${skip}`)
      .pipe(
        map(this.convertToIssueResponse),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown data service error has occured. Please try again later." + e));
          }
        })
      );
  }

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
            return throwError(() => new Error("Unknown error has occured. Please try again later.\n" + e.message + "\n" + e.name + "\n" + e.stack));
          }
        })
      );   // BUG: remove map part in production
  }

  getIssueAdditionalData(issueId: string): Observable<IssuePopupData> {
    return this.http
      .get<any>(`https://dummyjson.com/posts/${issueId}`)
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
