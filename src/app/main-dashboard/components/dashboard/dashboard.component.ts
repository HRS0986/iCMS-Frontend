import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import {MenuItem} from "primeng/api";
import { AuthendicationService } from '../../services/authendication.service';
import { ChartsService } from '../../services/charts.service';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { GridComponent } from '../grid/grid.component';
import { of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { DoughnutChartComponent } from '../charts/doughnut-chart/doughnut-chart.component';
import { LineAreaChartComponent } from '../charts/line-area-chart/line-area-chart.component';
import { WordcloudComponent } from '../charts/wordcloud/word-cloud.component';
import { DateRangeService } from '../../services/shared-date-range/date-range.service';
import { DashboardResponsetimeComponent } from '../../../email-analytics/components/dashboard-responsetime/dashboard-responsetime.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,OnDestroy{

  @ViewChild(GridComponent) gridComponent!: GridComponent;
  @ViewChild(DoughnutChartComponent) doughnutComponent!: DoughnutChartComponent;
  @ViewChild(LineAreaChartComponent) lineAreaComponent!: LineAreaChartComponent;
  @ViewChild(WordcloudComponent) wordCloudComponent!: WordcloudComponent;

  username:any;

  DataCacheChange:boolean= false;
  widgetCacheChange:boolean=false;

  chartLayout: { chartType: string; }[] = [];


  widgetData:any;

  callDoughnut: any;
  emailDoughnut: any;
  socialDoughnut:any ;

  chartValues:any;
  chartTitle:any;
  chartData: any;

  callLine :any;
  emailLine:any;
  socialLine:any;
  combinedLine:any;

  callWord :any;
  emailWord:any;
  socialWord:any;

  widgetTitle: any;
  widgetChart: any;
  widgetSoucrce: any;
  widgetGrid:any;

  lineChartdates : any;
  lineChartpositive : any;
  lineChartnegative : any;
  lineChartneutral: any;

  
  totalSums:any;

  percentage: number[] = [];

  breadcrumbItems: MenuItem[] = [
    {label: "Main Dashboard"},
  ];

  // myData = [
  //   {word: 'Prashant', weight: 40, color: 'green'},
  //   {word: 'Sandeep', weight: 39, color: 'green'},
  //   {word: 'Ajinkya', weight: 11, color: 'green'},
  //   {word: 'Kuldeep', weight: 36, color: 'green'},
  //   {word: 'Vivek', weight: 39},
  //   {word: 'Saheer', weight: 12, color: 'green'},
  //   {word: 'Lohit', weight: 27},
  //   {word: 'Anirudh', weight: 36},
  //   {word: 'Raj', weight: 22},
  //   {word: 'Mohan', weight: 40},
  //   {word: 'Yadav', weight: 39},
  //   {word: 'India', weight: 11, color: 'green'},
  //   {word: 'USA', weight: 27},
  //   {word: 'Sreekar', weight: 36},
  //   {word: 'Ram', weight: 39},
  //   {word: 'Deepali', weight: 12, color: 'green'},
  //   {word: 'Kunal', weight: 27},
  //   {word: 'Rishi', weight: 80},
  //   {word: 'Chintan', weight: 22}
  // ]
  
  private socketSubscription: Subscription | undefined;

  constructor(private authService: AuthendicationService,
    private chartService:ChartsService,
    private cookieService: CookieService,
    private dateRangeService: DateRangeService
    // private grid:GridComponent
  ) { }


  ngOnInit(): void {
    // this.loginAndFetchUserDetails();
    this.widgetsUserData();
    this.chartDataGet();

    this.socketSubscription = this.chartService.messages$.subscribe(
      message => {
        if (message.response === 'widget') {  
          this.gridComponent.changes=true;
          this.widgetsUserData();
        }
        // if (message.response === 'data') {
        //   this.chartDataGet();          
        // }
      }
    );


    // timer(0,1000).subscribe(() => {
    //   this.widgetsUserData();
    //   this.chartDataGet();
    //   if(this.widgetCacheChange || this.DataCacheChange)
    //     {
    //       this.widgetsUser();
    //       this.widgetCacheChange=false;
    //       this.DataCacheChange=false;
    //     }
    // });

  }

  
  ngOnDestroy() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  // loginAndFetchUserDetails(): void {
  //   const loginData: any = { "username": "janithravisankax@gmail.com", "password": "12345678" };
  //   this.authService.login(loginData).subscribe(
  //     (response) => {
  //       this.cookieService.set('token', response.AuthenticationResult.IdToken);
  //     },
  //   );
  // }

  chartDataGet(): void {
    this.chartService.chartData().subscribe(
      (response) => {  
        caches.open('all-data').then(cache => {
          cache.match('data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
                // Compare the response with the cached data
                if (!this.isEqual(response, cachedData)) {
                  // Update only the changed data in the cache
                  // const updatedData = { ...cachedData, ...response };
                  const dataResponse = new Response(JSON.stringify(response), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('data', dataResponse);
                  this.DataCacheChange = true;
                }
              });
            } else {
              // Cache the response if no cached data exists
              const dataResponse = new Response(JSON.stringify(response), {
                headers: { 'Content-Type': 'application/json' }
              });
              cache.put('data', dataResponse);
            }
          });
        });
      },
      // (error) => {
      //   console.error('Error fetching doughnut chart data:', error);
      // } 
    );
  }

  widgetsUserData(): void {
    console.log("chnaged widgets");
      this.chartService.widgetsUser().subscribe(
        async (response) => {
            try {
              const cache = await caches.open('widgets');
              const cachedResponse = await cache.match('widgets-data');
    
              if (cachedResponse) {
                const cachedData = await cachedResponse.json();
                if (!this.isEqual(response, cachedData)) {
                  const dataResponse = new Response(JSON.stringify(response), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  await cache.put('widgets-data', dataResponse);
                  this.widgetCacheChange = true;
                  this.gridComponent.changes = true;
                }
              } else {
                const dataResponse = new Response(JSON.stringify(response), {
                  headers: { 'Content-Type': 'application/json' }
                });
                await cache.put('widgets-data', dataResponse);
              }
            } 
            catch (error) {
              // console.error('Error handling cache:', error);
            }
          }
          
        ,
        (error) => {
          // console.error('Error fetching widgets user data:', error);
        }
      );
}

  
  isEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        return false;
      }
    }
    return true;
  }








  // doughnutChartData(): void {
  //   this.chartService.doughnutChart().subscribe(
  //     (response) => {
  //       console.log(response);        
  //       caches.open('chart-data').then(cache => {
  //         cache.match('doughnutChart').then((cachedResponse) => {
  //           if (cachedResponse) {
  //             cachedResponse.json().then((cachedData: any) => {

  //               if (!this.isEqual(response, cachedData)) {
  //                 const dataResponse = new Response(JSON.stringify(response), {
  //                   headers: { 'Content-Type': 'application/json' }
  //                 });
  //                 cache.put('doughnutChart', dataResponse);
  //                 this.cacheChange=true;
  //                 console.log(dataResponse);
  //               }
  //             });
  //           } else {
  //             const dataResponse = new Response(JSON.stringify(response), {
  //               headers: { 'Content-Type': 'application/json' }
  //             });
  //             cache.put('doughnutChart', dataResponse);
  //             console.log(dataResponse);
  //           }
  //         });
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching doughnut chart data:', error);
  //     }

  //   );
  // }

  // wordCloudData(): void {
  //   this.chartService.wordCloud().subscribe(
  //     (response) => {        
  //       caches.open('chart-data').then(cache => {
  //         cache.match('wordChart').then((cachedResponse) => {
  //           if (cachedResponse) {
  //             cachedResponse.json().then((cachedData: any) => {

  //               if (!this.isEqual(response, cachedData)) {
  //                 const dataResponse = new Response(JSON.stringify(response), {
  //                   headers: { 'Content-Type': 'application/json' }
  //                 });
  //                 cache.put('wordChart', dataResponse);
  //                 this.cacheChange=true;
  //                 console.log(this.cacheChange);
  //               }
  //             });
  //           } else {
  //             const dataResponse = new Response(JSON.stringify(response), {
  //               headers: { 'Content-Type': 'application/json' }
  //             });
  //             cache.put('wordChart', dataResponse);
  //           }
  //         });
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching doughnut chart data:', error);
  //     }

  //   );
  // }




  // lineAreaData(): void {
  //   this.chartService.lineChart().subscribe(
  //     (response) => {        
  //       caches.open('chart-data').then(cache => {
  //         cache.match('lineChart').then((cachedResponse) => {
  //           if (cachedResponse) {
  //             cachedResponse.json().then((cachedData: any) => {

  //               if (!this.isEqual(response, cachedData)) {
  //                 const dataResponse = new Response(JSON.stringify(response), {
  //                   headers: { 'Content-Type': 'application/json' }
  //                 });
  //                 cache.put('lineChart', dataResponse);
  //                 this.cacheChange=true;
  //                 console.log(this.cacheChange);
  //               }
  //             });
  //           } else {
  //             const dataResponse = new Response(JSON.stringify(response), {
  //               headers: { 'Content-Type': 'application/json' }
  //             });
  //             cache.put('lineChart', dataResponse);
  //           }
  //         });
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching doughnut chart data:', error);
  //     }

  //   );
  // }

  // widgets(): void {
  //   const token = this.cookieService.get('token');
  //   this.chartService.allWidgets(token).subscribe(
  //     (response) => {        
  //     // this.chartValues = response.map((item: any) => item.chart);
  //     // this.chartTitle = response.map((item: any) => item.title);

  //       caches.open('widgets').then(cache => {
  //         cache.match('widgets-data').then((cachedResponse) => {
  //           if (cachedResponse) {
  //             cachedResponse.json().then((cachedData: any) => {

  //               if (!this.isEqual(response, cachedData)) {
  //                 const dataResponse = new Response(JSON.stringify(response), {
  //                   headers: { 'Content-Type': 'application/json' }
  //                 });
  //                 cache.put('widgets-data', dataResponse);
  //                 this.cacheChange=true;
  //                 console.log(this.cacheChange);
  //               }
  //             });
  //           } else {
  //             const dataResponse = new Response(JSON.stringify(response), {
  //               headers: { 'Content-Type': 'application/json' }
  //             });
  //             cache.put('widgets-data', dataResponse);
  //           }
  //         });
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching doughnut chart data:', error);
  //     }

  //   );
  // }

}

