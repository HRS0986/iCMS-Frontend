import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators'; // BUG: remove in production

import { AllCompanyAddresses, AllStatus, AllTags, ClientAddresses } from '../interfaces/filters';
import { ERRORS, SETTINGS, URLS } from './app.constants';
@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  getTags(type: "issue" | "inquiry" | "suggestion"): Observable<AllTags> {
    return this.http
      .get<AllTags>(`${URLS.baseUrlv2}/filter/tags?type=${type}`)
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

  getStatus(type: "issue" | "inquiry" | "suggestion"): Observable<AllStatus> {
    return this.http
      .get<AllStatus>(`${URLS.baseUrlv2}/filter/statuses?type=${type}`)
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

  getCompanyAddresses(type: "issue" | "inquiry" | "suggestion"): Observable<AllCompanyAddresses> {
    return this.http
      .get<AllCompanyAddresses>(`${URLS.baseUrlv2}/filter/company-addresses?type=${type}`)
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

  getClientAddresses(type: "issue" | "inquiry" | "suggestion"): Observable<ClientAddresses> {
    return this.http
      .get<ClientAddresses>(`${URLS.baseUrlv2}/filter/client-addresses?type=${type}`)
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
