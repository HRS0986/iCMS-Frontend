import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InquiryMetaDataResponse, MockInquiryMetadataResponse, InquiryPopupData } from '../interfaces/inquiries';
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

  private convertToInquiryAdditionalData(response: any): InquiryPopupData {
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

  getInquiryAdditionalData(id: string): Observable<InquiryPopupData> {
    return this.http
      .get<any>(`https://dummyjson.com/posts/${id}`)
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
