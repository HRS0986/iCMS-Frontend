import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { UtilityService } from './utility.service';
import { Filter } from '../interfaces/filters';
import { ThreadResponse, ThreadConversationSummary } from '../interfaces/threads';
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
      .get<ThreadResponse>(`${URLS.baseUrlv2}/threads/hot-threads?${params}`)
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

  getConversationSummary(threadId: string): Observable<ThreadConversationSummary> {
    return this.http
      .get<ThreadConversationSummary>(`${URLS.baseUrlv2}/threads/summary/${threadId}`)
      .pipe(
        timeout(SETTINGS.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error(ERRORS.timeoutError));
          } else {
            console.error(e);
            return throwError(() => new Error(ERRORS.unknownFetchError));
          }
        })
      );
  }

  // lorem = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique malesuada ligula nec aliquet. Donec at blandit tellus. Cras vestibulum molestie quam, a commodo quam rutrum interdum. Aenean aliquet posuere ante rhoncus facilisis. Duis vitae purus eget libero imperdiet laoreet vel sed neque. Cras facilisis feugiat odio, id congue lorem rhoncus eget. Ut eget dignissim massa. Maecenas feugiat, felis nec dapibus faucibus, arcu ligula fermentum diam, sed aliquet sem lorem eget ipsum.\n\nQuisque a ornare metus, nec semper turpis. Nunc tincidunt fermentum neque, vitae feugiat libero venenatis varius. Suspendisse faucibus pulvinar orci eget fermentum. Etiam magna tellus, pretium vitae velit vel, blandit lacinia erat. Vestibulum at lorem a mi iaculis tristique vitae vitae erat. In hac habitasse platea dictumst. Nullam fringilla, nisl sit amet feugiat aliquam, augue risus sodales ipsum, eget consectetur ligula orci at est. In at vehicula magna, sed convallis lacus. Phasellus semper libero id ipsum congue, et elementum purus fermentum. Praesent ligula lacus, pharetra blandit aliquam ac, convallis sit amet tellus. Nullam a volutpat nisi. ";
  // getMockHotThreads(criteria: Filter, first: number, rows: number): Observable<ThreadResponse> {
  //   // const params = this.utility.buildFilterParams(criteria, rows, first);
  //   const mockData: ThreadResponse = {
  
  //     threads: new Array(10).fill(null).map(() => ({
  //       subject: 'test subject' + Math.random(),
  //       type: 'hot',
  //       snippet: 'test snippet' + Math.random(),
  //       summary: this.lorem,
  //       lastUpdate: new Date(),
  //       tags: ["test", "test2"]
  //     })),
  //     total: 10,
  //     skip: 0,
  //     limit: 10
  //   };
  //   return of(mockData);
  // }
  // getMockAllThreads(criteria: Filter, first: number, rows: number): Observable<ThreadResponse> {
  //   // const params = this.utility.buildFilterParams(criteria, rows, first);
  //   const mockData: ThreadResponse = {
  //     threads: new Array(60).fill(null).map(() => ({
  //       subject: 'test subject' + Math.random(),
  //       type: Math.random() > 0.7 ? 'hot' : 'normal',
  //       snippet: 'test snippet' + Math.random(),
  //       summary: this.lorem,
  //       lastUpdate: new Date(),
  //       tags: ["test", "test2"]
  //     })),
  //     total: 60,
  //     skip: 0,
  //     limit: 10
  //   };
  //   return of(mockData);
  // }
}
