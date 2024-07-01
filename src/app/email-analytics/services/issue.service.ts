import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Issue, IssueDataResponse, IssuePopupData, MockIssueMetadata, MockIssueMetadataResponse } from '../interfaces/issues';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators'; // BUG: remove in production
import { Filter } from '../interfaces/filters';
import { UtilityService } from './utility.service';
import { ERRORS, SETTINGS, URLS } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient, private utility: UtilityService) { }

  // BUG: REMOVE in Production


  // private convertToIssueResponse(mockedResponse: MockIssueMetadataResponse): IssueDataResponse {

  //   const randomData = (mockedIssue: MockIssueMetadata): Issue => {
  //     const status: Issue['status'][] = ['new', 'waiting', 'update', 'closed'];
  //     const randomStatus: Issue['status'] = status[Math.floor(Math.random()*status.length)];
  //     if (randomStatus === 'closed') {
  //       const dateClosed = new Date(new Date().valueOf() - Math.random()*(1e+8));
  //       const efficiency = Math.floor(1 + 5*Math.random());
  //       const effectivity = Math.floor(1 + 5*Math.random());
    
  //       return {
  //         id: mockedIssue.id.toString(),
  //         subject: "test subject",
  //         issue: mockedIssue.title,
  //         status: randomStatus,
  //         client: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
  //         company: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
  //         dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)),
  //         dateClosed: dateClosed,
  //         tags: mockedIssue.tags,
  //         effectivity: effectivity,
  //         efficiency: efficiency
  //       };
  //     }
  //     return {
  //       id: mockedIssue.id.toString(),
  //       subject: "test subject",
  //       issue: mockedIssue.title,
  //       isOverdue: Math.random() < 0.5,
  //       status: randomStatus,
  //       client: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
  //       company: Math.random().toString(36).substring(2) + "@" + Math.random().toString(36).substring(8) + ".com",
  //       dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)),
  //       dateUpdate: new Date(new Date().valueOf() - Math.random()*(1e+7)),
  //       tags: mockedIssue.tags,
  //     };
  //   }

  //   const convertedData = mockedResponse.products.map((mockedIssue) => (randomData(mockedIssue)));
  //   return {
  //     issues: convertedData,
  //     total: mockedResponse.total,
  //     skip: mockedResponse.skip,
  //     limit: mockedResponse.limit,
  //   };
  // }

  // private convertToIssueAdditionalData(response: any): IssuePopupData {
  //   return {
  //     emails: [
  //       "We are experiencing a critical issue in our production environment with the Mercury API. We are seeing extremely high latency and frequent 500 errors. This is causing major disruption to our services.\n\nWe are currently using Mercury language version 1.2.5 and our API is deployed on AWS.\n\nWe have checked our API logs and can't seem to pinpoint the root cause. The issue started around [mention approximate time] today.\n\nWe need immediate assistance to resolve this issue. Please contact us as soon as possible.", 
  //       "Dear John,\n\nThank you for contacting Aetheros Support. We understand the urgency of the issue you are experiencing with the Mercury API in your production environment.\n\nWe have escalated your case to our senior engineers who are investigating the issue.  To assist them in resolving this issue quickly, could you please provide us with the following information:\n\n* The specific endpoint(s) experiencing issues.\n* A copy of your API logs from the time the issue started.\n* Any recent changes made to your code or infrastructure.\n\nWe will keep you updated on our progress. In the meantime, please do not hesitate to contact us if you have any further questions.\n\nSincerely,\nAetheros Support Team", 
  //       "Hi,\n\nThanks for the quick response. \n\nThe endpoint experiencing the issue is: `/api/v2/processOrder`\n\nI've attached the relevant API logs. \n\nWe haven't made any recent changes to our code, but we did update our AWS load balancer configuration yesterday.\n\nLet me know if you need any further information.\n\nThanks,\nJohn", 
  //       "Our production environment is currently down. We are unable to access any of our instances and our monitoring tools are not providing any insights.\n\nWe are experiencing a complete outage and this is severely impacting our business operations. \n\nWe require immediate assistance to resolve this issue.\n\nPlease advise on the next steps ASAP.", 
  //       "Dear John,\n\nThank you for contacting Aetheros Support.\n\nWe understand that you are experiencing a critical issue with your production environment. Our team is currently investigating the issue and will provide an update as soon as possible. \n\nIn the meantime, could you please provide us with your Aetheros account ID and the approximate time the issue began?\n\nBest regards,\nAetheros Support Team", 
  //       "Our Aetheros Account ID is 857492 and the outage started around 08:05 AM UTC."
  //     ].map((email: any) => ({
  //       body: email,
  //       isClient: Math.random() < 0.5,
  //       dateTime: new Date(new Date().valueOf() - Math.random()*(1e+9))
  //     })),
  //     subject: "Critical issue with Mercury API",
  //     client: "Johndoe@gmail.com",
  //     company: "Aetheros@support.com",
  //     issue: "We are experiencing a critical issue in our production environment with the Mercury API. We are seeing extremely high latency and frequent 500 errors. This is causing major disruption to our services.",
  //     tags: ["Critical", "High Priority"],
  //     status: "update",
  //     isOverdue: false,
  //     dateOpened: new Date(new Date().valueOf() - Math.random()*(1e+9)),
  //     dateUpdate: new Date(new Date().valueOf() - Math.random()*(1e+7)),
  //     dateClosed: new Date(new Date().valueOf() - Math.random()*(1e+8)),
  //     dateOverdue: new Date(new Date().valueOf() - Math.random()*(1e+6)),
  //     firstResponseTime: (1e4)*Math.random(),
  //     avgResponseTime: (1e+4)*Math.random(),
  //     resolutionTime: (1e+4)*Math.random(),
  //     effectivity: Math.floor(1 + 5*Math.random()),
  //     efficiency: Math.floor(1 + 5*Math.random()),
  //     sentiment: 0.5,
  //     id: "1256",
  //   }
  // }
  // ---

  getIssueData(filterCriteria: Filter, skip: number, limit: number): Observable<IssueDataResponse> {
    const params = this.utility.buildFilterParams(filterCriteria, limit, skip);
    return this.http
      .get<IssueDataResponse>(`${URLS.baseUrlv2}/issues?${params}`)
      .pipe(
        timeout(SETTINGS.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error(ERRORS.timeoutError));
          } else {
            return throwError(() => new Error(ERRORS.unknownFetchError));
          }
        })
      );
  }

  // getMockIssueData(filterCriteria: Filter, skip: number, limit: number): Observable<IssueDataResponse> {
  //   return this.http
  //     .get<MockIssueMetadataResponse>(`https://dummyjson.com/products/?limit=${limit}&skip=${skip}`)
  //     .pipe(
  //       map(this.convertToIssueResponse),
  //       timeout(SETTINGS.timeoutDuration),
  //       catchError(e => {
  //         if (e.name === 'TimeoutError') {
  //           return throwError(() => new Error(ERRORS.timeoutError));
  //         } else {
  //           return throwError(() => new Error(ERRORS.unknownFetchError + e));
  //         }
  //       })
  //     );
  // }

  // getIssueMetadata(skip: number, limit: number): Observable<IssueDataResponse> {
  //   return this.http
  //     .get<MockIssueMetadataResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  //     .pipe(
  //       map(this.convertToIssueResponse),
  //       timeout(SETTINGS.timeoutDuration),
  //       catchError(e => {
  //         if (e.name === 'TimeoutError') {
  //           return throwError(() => new Error(ERRORS.timeoutError));
  //         } else {
  //           return throwError(() => new Error("Unknown error has occured. Please try again later.\n" + e.message + "\n" + e.name + "\n" + e.stack));
  //         }
  //       })
  //     );   // BUG: remove map part in production
  // }

  // getMockIssueAdditionalData(issueId: string): Observable<IssuePopupData> {
  //   return this.http
  //     .get<any>(`https://dummyjson.com/posts/${issueId}`)
  //     .pipe(
  //       map(this.convertToIssueAdditionalData),
  //       timeout(SETTINGS.timeoutDuration),
  //       catchError(e => {
  //         if (e.name === 'TimeoutError') {
  //           return throwError(() => new Error(ERRORS.timeoutError));
  //         } else {
  //           return throwError(() => new Error("Unknown error has occured. Please try again later."));
  //         }
  //       })
  //     );  // BUG: remove map part in production
  // }
  getIssueAdditionalData(issueId: string): Observable<IssuePopupData> {
    return this.http
      .get<IssuePopupData>(`${URLS.baseUrlv2}/issues/${issueId}`)
      .pipe(
        timeout(SETTINGS.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error(ERRORS.timeoutError));
          } else {
            return throwError(() => new Error(ERRORS.unknownFetchError));
          }
        })
      );
  }

}
