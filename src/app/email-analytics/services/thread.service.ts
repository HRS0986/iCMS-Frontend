import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, timeout } from 'rxjs';
import { UtilityService } from './utility.service';
import { Filter } from '../interfaces/filters';
import { ThreadResponse } from '../interfaces/threads';
import { HttpClient } from '@angular/common/http';
import { URLS, SETTINGS, ERRORS } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(
    private utility: UtilityService,
    private http: HttpClient,
  ) { }

  getHotThreads(criteria: Filter, first: number, rows: number): Observable<ThreadResponse> {
    const params = this.utility.buildFilterParams(criteria, rows, first);
    return this.http
      .get<ThreadResponse>(`${URLS.baseUrlv2}/threads?${params}`)
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

  getAllThreads(criteria: Filter, first: number, rows: number): Observable<ThreadResponse> {
    const params = this.utility.buildFilterParams(criteria, rows, first);
    return this.http
      .get<ThreadResponse>(`${URLS.baseUrlv2}/threads?${params}`)
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

  getMockHotThreads(criteria: Filter, first: number, rows: number): Observable<ThreadResponse> {
    // const params = this.utility.buildFilterParams(criteria, rows, first);
    const mockData: ThreadResponse = {
  
      threads: new Array(10).fill(null).map(() => ({
        subject: 'test subject' + Math.random(),
        type: Math.random() > 0.5 ? 'hot' : 'normal',
        snippet: 'test snippet' + Math.random(),
        summary: Math.random() + "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis.",
        lastUpdate: new Date(),
        tags: ["test", "test2"]
      })),
      total: 10,
      skip: 0,
      limit: 10
    };
    return of(mockData);
  }
  getMockAllThreads(criteria: Filter, first: number, rows: number): Observable<ThreadResponse> {
    // const params = this.utility.buildFilterParams(criteria, rows, first);
    const mockData: ThreadResponse = {
      threads: new Array(10).fill({
        subject: 'test subject' + Math.random(),
        type: Math.random() > 0.5 ? 'hot' : 'normal',
        snippet: 'test snippet' + Math.random(),
        summary: Math.random() + "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis. Nullam nec purus feugiat, vestibulum mi id, ultricies turpis.",
        lastUpdate: new Date(),
        tags: ["test", "test2"]
      }),
      total: 10,
      skip: 0,
      limit: 10
    };
    return of(mockData);
  }
}
