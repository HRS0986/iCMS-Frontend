import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import {ChartModule} from "primeng/chart";


@NgModule({
  declarations: [
    DashboardComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    ChartModule
  ]
})
export class MainDashboardModule { }
