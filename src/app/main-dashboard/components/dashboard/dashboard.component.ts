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

  cacheChange:boolean= false;

  chartValues:any;
  chartTitle:any;
  chartData: any;

  lineChartdates : any;
  lineChartpositive : any;
  lineChartnegative : any;
  lineChartneutral: any;

  breadcrumbItems: MenuItem[] = [
    {label: "Main Dashboard"},
  ];

  myData = [
    {word: 'Prashant', weight: 40, color: 'green'},
    {word: 'Sandeep', weight: 39, color: 'green'},
    {word: 'Ajinkya', weight: 11, color: 'green'},
    {word: 'Kuldeep', weight: 36, color: 'green'},
    {word: 'Vivek', weight: 39},
    {word: 'Saheer', weight: 12, color: 'green'},
    {word: 'Lohit', weight: 27},
    {word: 'Anirudh', weight: 36},
    {word: 'Raj', weight: 22},
    {word: 'Mohan', weight: 40},
    {word: 'Yadav', weight: 39},
    {word: 'India', weight: 11, color: 'green'},
    {word: 'USA', weight: 27},
    {word: 'Sreekar', weight: 36},
    {word: 'Ram', weight: 39},
    {word: 'Deepali', weight: 12, color: 'green'},
    {word: 'Kunal', weight: 27},
    {word: 'Rishi', weight: 80},
    {word: 'Chintan', weight: 22}
  ]

  constructor(private authService: AuthendicationService, private chartService:ChartsService, private cookieService: CookieService) { }
  ngOnInit(): void {
    this.loginAndFetchUserDetails();
    this.chartDetails();
    this.widgets();

      timer(0,2000).subscribe(() => {
      if(this.cacheChange==true)
        {
          this.chartDetails();
          this.cacheChange=false;
        }
        this.widgets();    
    });
  }

  loginAndFetchUserDetails(): void {
    const loginData: any = { "email": "Thenujan@gmail.com", "password": "Thenujan" };
    this.authService.login(loginData).subscribe(
      (response) => {
        this.cookieService.set('token', response.access_token);
        // console.log(this.cookieService.get('token'));
      },
    );
  }

  widgets(): void {
    const token = this.cookieService.get('token');
    this.chartService.allWidgets(token).subscribe(
      (response) => {        

      // this.chartValues = response.map((item: any) => item.chart);
      // this.chartTitle = response.map((item: any) => item.title);

        caches.open('widgets').then(cache => {
          cache.match('widgets-data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
            
                if (!this.isEqual(response, cachedData)) {
                  const dataResponse = new Response(JSON.stringify(response), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('widgets-data', dataResponse);
                  this.cacheChange=true;
                  console.log(this.cacheChange);
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

  chartDetails(){
    caches.open('widgets').then(cache => {
      cache.match('widgets-data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            this.chartValues = data.map((item: any) => item.chart);
            this.chartTitle = data.map((item: any) => item.title);
            this.chartData = data.map((item: any) => item.data);
            console.log(this.chartData);
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
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

  extractPercentages(data: any): number[] {
    return [data.negative, data.positive, data.neutral];
  }

  extractPLineChart(data: any): any{
    const DateWithSentiments = data;
    this.lineChartdates = Object.values(DateWithSentiments).map((entry: any) => entry.Date);
    this.lineChartpositive = Object.values(DateWithSentiments).map((entry: any) => entry.positive);
    this.lineChartnegative = Object.values(DateWithSentiments).map((entry: any) => entry.negative);
    this.lineChartneutral = Object.values(DateWithSentiments).map((entry: any) => entry.neutral);
    return this.lineChartdates;
  }


}
