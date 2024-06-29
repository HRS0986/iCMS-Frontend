import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import {MenuItem} from "primeng/api";
import { ChartsService } from '../../services/charts.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { GridComponent } from '../grid/grid.component';
import { DoughnutChartComponent } from '../charts/doughnut-chart/doughnut-chart.component';
import { LineAreaChartComponent } from '../charts/line-area-chart/line-area-chart.component';
import { WordcloudComponent } from '../charts/wordcloud/word-cloud.component';
import { DateRangeService } from '../../services/shared-date-range/date-range.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';

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

  
  private socketSubscription: Subscription | undefined;

  constructor(private authService: AuthenticationService,
    private chartService:ChartsService,
    private cookieService: CookieService,
    private dateRangeService: DateRangeService,

  ) { }


  ngOnInit(): void {
    this.widgetsUserData();
    this.chartDataGet();

    this.socketSubscription = this.chartService.messages$.subscribe(
      message => {
        if (message.response === 'widget') {  
          this.gridComponent.changes=true;
          this.widgetsUserData();
        }
      }
    );

  }

  
  ngOnDestroy() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  chartDataGet(): void {
    this.authService.getIdToken().subscribe((token) =>{
    this.chartService.chartData(token).subscribe(
      (response) => {
        if(response!=false){  
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
      }
      else{
        this.authService.signOut();
        caches.open('all-data').then(cache => {
          cache.keys().then(keys => {
            keys.forEach(key => {
              cache.delete(key);
            });
          }).then(() => {
            console.log('All cache entries deleted successfully.');
          }).catch(error => {
            console.error('Error deleting cache entries:', error);
          });
        });
      }
      // (error) => {
      //   console.error('Error fetching doughnut chart data:', error);
      // } 
    }
    
    );
  });
  }

  widgetsUserData(): void {
    console.log("chnaged widgets");
    this.authService.getIdToken().subscribe((token) =>{
      this.chartService.widgetsUser(token).subscribe(
        async (response) => {
          if(response!=false){
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
            else{
              this.authService.signOut();
              caches.open('widgets').then(cache => {
                cache.keys().then(keys => {
                  keys.forEach(key => {
                    cache.delete(key);
                  });
                }).then(() => {
                  console.log('All cache entries deleted successfully.');
                }).catch(error => {
                  console.error('Error deleting cache entries:', error);
                });
              });
            }
          }
          
        ,
        (error) => {
          // console.error('Error fetching widgets user data:', error);
        }
      );
  });
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

}

