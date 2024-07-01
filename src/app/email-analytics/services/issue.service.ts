import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueDataResponse, IssuePopupData } from '../interfaces/issues';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators'; // BUG: remove in production
import { Filter } from '../interfaces/filters';
import { UtilityService } from './utility.service';
import { ERRORS, SETTINGS, URLS } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient, private utility: UtilityService) { }

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
