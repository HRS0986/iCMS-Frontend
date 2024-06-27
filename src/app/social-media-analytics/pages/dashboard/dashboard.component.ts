import { Component,OnInit} from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Dashboard"}
  ];

  myData1 = [
    {word: 'Prashant', weight: 100, color: 'green'},
    {word: 'Sandeep', weight: 70, color: 'green'},
    {word: 'Ajinkya', weight: 20, color: 'green'},
    {word: 'Kuldeep', weight: 56, color: 'green'},
    {word: 'Vivek', weight: 59},
    {word: 'Saheer', weight: 32, color: 'green'},
    {word: 'Lohit', weight: 47},
    {word: 'Anirudh', weight: 56},
    {word: 'Raj', weight: 52},
    {word: 'Mohan', weight: 60},
    {word: 'Yadav', weight: 59},
    {word: 'India', weight: 31, color: 'green'},
    {word: 'USA', weight: 47},
    {word: 'Sreekar', weight: 56},
    {word: 'Ram', weight: 59},
    {word: 'Deepali', weight: 32, color: 'green'},
    {word: 'Kunal', weight: 47},
    {word: 'Rishi', weight: 100},
    {word: 'Chintan', weight: 42},
    
  ]

  myData2 = [
    {word: 'Prashant', weight: 100, color: 'green'},
    {word: 'Sandeep', weight: 70, color: 'green'},
    {word: 'Ajinkya', weight: 20, color: 'green'},
    {word: 'Kuldeep', weight: 56, color: 'green'},
    {word: 'Vivek', weight: 59},
    {word: 'Saheer', weight: 32, color: 'green'},
    {word: 'Lohit', weight: 47},
    {word: 'Anirudh', weight: 56},
    {word: 'Raj', weight: 52},
    {word: 'Mohan', weight: 60},
    {word: 'Yadav', weight: 59},
    {word: 'India', weight: 31, color: 'green'},
    {word: 'USA', weight: 47},
    {word: 'Sreekar', weight: 56},
    {word: 'Ram', weight: 59},
    {word: 'Deepali', weight: 32, color: 'green'},
    {word: 'Kunal', weight: 47},
    {word: 'Rishi', weight: 100},
    {word: 'Chintan', weight: 42},
    
  ]

  
  data_doughnut: number[] = [100, 50, 100];
 
}
