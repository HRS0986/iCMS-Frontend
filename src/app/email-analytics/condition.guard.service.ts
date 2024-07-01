import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { URLS } from './services/app.constants';
@Injectable({
  providedIn: 'root'
})


export class ConditionService {

    private needToAuthorizeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needToAuthorize$: Observable<boolean> = this.needToAuthorizeSubject.asObservable();
  
    constructor(private http: HttpClient) {
      this.startAuthorizationCheck();
    }
  
    private getNeedForAuthorization(): Observable<any> {
      const url = `${URLS.baseUrl}/info_and_retrieval/get_need_for_authorization`;
      return this.http.get<any>(url);
    }
  
    private startAuthorizationCheck(): void {
      interval(30000) // Poll every 30 seconds
        .pipe(
          switchMap(() => this.getNeedForAuthorization())
        )
        .subscribe(
          response => this.needToAuthorizeSubject.next(response.needToAuthorize),
          error => console.error('Error fetching authorization need', error)
        );
    }
  
    getCondition(): boolean {
      return this.needToAuthorizeSubject.getValue();
    }
  
    // Optionally, you can have a method to refresh the value manually
    refreshNeedForAuthorization(): void {
      this.getNeedForAuthorization().subscribe(
        response => this.needToAuthorizeSubject.next(response.needToAuthorize),
        error => console.error('Error fetching authorization need', error)
      );
    }

//   needToAuthorize: boolean = false

//   constructor(private http: HttpClient) { }

//   getNeedForAuthorization(): Observable<any[]> {
//     const url = `http://127.0.0.1:8000/email/info_and_retrieval/get_need_for_authorization`;
//     return this.http.get<any[]>(url);
//   }

//   getCondition(): boolean {
//     return this.needToAuthorize;
//   }

//   ngOnInit(): void {

//         type dict = { [key: string]: any };
//         this.getNeedForAuthorization().subscribe((data: dict) => {
//           console.log("data about whether there is a need to authroize an account", data)
//           this.needToAuthorize = data["needToAuthorize"]
  
//          });

       
//     }


}