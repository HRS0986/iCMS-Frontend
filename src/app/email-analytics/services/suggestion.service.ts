import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { SuggestionResponse } from '../interfaces/suggestions';
import { Filter } from '../interfaces/filters';
import { UtilityService } from './utility.service';
import { ERRORS, URLS, SETTINGS } from './app.constants';
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient, private utility: UtilityService) { }

  /**
   * Retrieves suggestion data based on the provided filter criteria, skip, and limit.
   * @param filterCriteria - The filter criteria to apply.
   * @param skip - The number of items to skip.
   * @param limit - The maximum number of items to retrieve.
   * @returns An Observable that emits the suggestion metadata response.
   */
  getSuggestionData(filterCriteria: Filter, skip: number, limit: number): Observable<SuggestionResponse> {

    const params = this.utility.buildFilterParams(filterCriteria, limit, skip);
    return this.http
      .get<SuggestionResponse>(`${URLS.baseUrlv2}/suggestions?${params}`)
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