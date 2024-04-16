import { Component } from '@angular/core';
import { DoughnutChartComponent } from '../charts/doughnut-chart/doughnut-chart.component';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Main Dashboard"},
  ];

}
