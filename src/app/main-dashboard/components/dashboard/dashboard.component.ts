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

}
