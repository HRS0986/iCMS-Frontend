import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import { AuthendicationService } from '../../services/authendication.service';
import { ChartsService } from '../../services/charts.service';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  DataCacheChange:boolean= false;
  widgetCacheChange:boolean=false;


  widgetData:any;

  callDoughnut: any;
  emailDoughnut: any;
  socialDoughnut:any ;

  widgetTitle: any;
  widgetChart: any;
  widgetSoucrce: any;

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
  
  constructor(private authService: AuthendicationService, private chartService:ChartsService, private cookieService: CookieService) { }
  ngOnInit(): void {
    // this.loginAndFetchUserDetails();
    // this.widgetsUserData();
    // this.chartDataGet();
    // this.widgetsUser();

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

  loginAndFetchUserDetails(): void {
    const loginData: any = { "email": "Thenujan@gmail.com", "password": "Thenujan" };
    this.authService.login(loginData).subscribe(
      (response) => {
        this.cookieService.set('token', response.access_token);
        console.log(response.access_token);
      },
    );
  }

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
      (error) => {
        console.error('Error fetching doughnut chart data:', error);
      } 
    );
  }
  

  widgetsUser(){
    caches.open('widgets').then(cache => {
      cache.match('widgets-data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            console.log("user:",data);
            this.widgetTitle = data.map((item: any) => item.title);
            this.widgetChart = data.map((item: any) => item.chartType);
            this.widgetSoucrce = data.map((item: any) => item.sources);
            this.widgetData = this.processWidgetData(this.widgetTitle, this.widgetChart, this.widgetSoucrce);
            console.log(this.widgetData);
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
  }

  widgetsUserData(): void {
    const token = this.cookieService.get('token');
    this.chartService.widgetsUser(token).subscribe(
      (response) => {
        caches.open('widgets').then(cache => {
          cache.match('widgets-data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
            
                if (!this.isEqual(response, cachedData)) {
                  const dataResponse = new Response(JSON.stringify(response), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('widgets-data', dataResponse);
                  this.widgetCacheChange=true;
                }
              });
            } else {
              const dataResponse = new Response(JSON.stringify(response), {
                headers: { 'Content-Type': 'application/json' }
              });
              cache.put('widgets-data', dataResponse);
            }
          });
        });
      },
      (error) => {
        console.error('Error fetching doughnut chart data:', error);
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
        console.log(`${key} values are different`);
        return false;
      }
    }
    return true;
  }



  processWidgetData(titles: string[], chartTypes: string[], sources: any[]): any[] {
    const validSources = ['email', 'call', 'social'];
    const datasetList: any[] = [];
  
    titles.forEach((title, index) => {
      const source = sources[index];
      const chartType = chartTypes[index];
  
      // Verify the sources
      const titleSources = title.toLowerCase().split(/[\s,-]+/).filter(word => validSources.includes(word));
      if (titleSources.length === 0) {
        console.warn(`Title "${title}" does not have a valid source`);
        return;
      }
      
      // Create a dataset object
      const dataset = {
        title,
        chartType,
        sources: titleSources
      };
  
      datasetList.push(dataset);
    });
  
    return datasetList;
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
