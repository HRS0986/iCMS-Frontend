import { Injectable,ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { AuthendicationService } from './authendication.service';
import { GridComponent } from '../components/grid/grid.component';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  @ViewChild(GridComponent) gridComponent!: GridComponent;


  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.asObservable();

  private baseUrl = 'http://13.201.125.196:8002/charts';
  // private baseUrl = 'http://127.0.0.1:8002/charts';

  username:any;


  constructor(private http: HttpClient) {
    this.connect();
  }

  private connect() {
    this.socket$ = webSocket(`${this.baseUrl}/ws`);

    this.socket$.subscribe(
      message => this.messagesSubject$.next(message),
      // err => console.error(err),
      // () => console.warn('Completed!')
    );
  }

  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    } else {
      // console.error('WebSocket is not connected');
    }
  }

  close() {
    if (this.socket$) {
      this.socket$.complete();
    } else {
      // console.error('WebSocket is not connected');
    }
  }

  // private baseUrlUser = 'http://127.0.0.1:8001/authendication';

  // constructor(private http: HttpClient ) {}

  // doughnutChart(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/doughnutChart`);
  // }

  chartData(token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/chartData`,{ headers });
  }

  gridDeleted(id:string,token:string): Observable<any>{

    console.log(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.baseUrl}/gridDeleted/${id}`,{ headers });

  }
  // wordCloud(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/wordCloud`);
  // }

  // lineChart(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/lineChart`);
  // }

  newWidget(token:string,widgetData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.baseUrl}/newWidget`, {'widget':widgetData}, { headers });
  }

  saveGridLayout(token:string,widgetData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/gridChanged`, {'items':widgetData}, { headers });
  }

  saveGridStatus(token:string,id:string,status:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/gridStatus`, {'id':id , 'status':status}, { headers });
  }


  barChart(sources: any,date:any): Observable<any> {
    console.log({"collections":sources,
    "date_range":date || []});
    return this.http.post<any>(`${this.baseUrl}/barChart`,{"collections":sources,
    "date_range":date || []});
  }

  // allWidgets(token :string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });

  //   return this.http.get<any>(`${this.baseUrl}/allWidgets`,{headers});
  // }

  widgetsUser(token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/widgetsUser`, { headers });
}

  // chartDataGet(): void {
  //   this.chartData().subscribe(
  //     (response) => {
  //       caches.open('all-data').then(cache => {
  //         cache.match('data').then((cachedResponse) => {
  //           if (cachedResponse) {
  //             cachedResponse.json().then((cachedData: any) => {
  //               // Compare the response with the cached data
  //               if (!this.isEqual(response, cachedData)) {
  //                 // Update only the changed data in the cache
  //                 // const updatedData = { ...cachedData, ...response };
  //                 const dataResponse = new Response(JSON.stringify(response), {
  //                   headers: { 'Content-Type': 'application/json' }
  //                 });
  //                 cache.put('data', dataResponse);
  //                 // Emit an event indicating that data has changed
  //                 this.messagesSubject$.next({ type: 'data-change', data: response });
  //               }
  //             });
  //           } else {
  //             // Cache the response if no cached data exists
  //             const dataResponse = new Response(JSON.stringify(response), {
  //               headers: { 'Content-Type': 'application/json' }
  //             });
  //             cache.put('data', dataResponse);
  //           }
  //         });
  //       });
  //     },
  //     // (error) => {
  //     //   console.error('Error fetching chart data:', error);
  //     // }
  //   );
  // }

//   widgetsUserData(): void {
//     this.widgetsUser().subscribe(
//       (response) => {
//         console.log('service widgetsUser');
//         caches.open('widgets').then(cache => {
//           cache.match('widgets-data').then((cachedResponse) => {
//             if (cachedResponse) {
//               cachedResponse.json().then((cachedData: any) => {

//                 if (!this.isEqual(response, cachedData)) {
//                   const dataResponse = new Response(JSON.stringify(response), {
//                     headers: { 'Content-Type': 'application/json' }
//                   });
//                   cache.put('widgets-data', dataResponse);
//                   // this.widgetCacheChange=true;
//                 }
//               });
//             } else {
//               const dataResponse = new Response(JSON.stringify(response), {
//                 headers: { 'Content-Type': 'application/json' }
//               });
//               cache.put('widgets-data', dataResponse);
//             }
//           });
//         });
//       },
//       // (error) => {
//       //   console.error('Error fetching doughnut chart data:', error);
//       // }
//     );
// }

//   isEqual(obj1: any, obj2: any): boolean {
//     const keys1 = Object.keys(obj1);
//     const keys2 = Object.keys(obj2);

//     if (keys1.length !== keys2.length) return false;

//     for (let key of keys1) {
//       if (!keys2.includes(key)) return false;
//       if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
//         return false;
//       }
//     }
//     return true;

//   }
// }

}
