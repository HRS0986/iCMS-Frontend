import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAnalyticsRoutingModule } from './call-analytics-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import { StatCardComponent } from './components/stat-card/stat-card.component';
import {PanelModule} from "primeng/panel";
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import {ChartModule} from "primeng/chart";
import { LineAreaChartComponent } from './components/line-area-chart/line-area-chart.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StatCardComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    WordCloudComponent
  ],
  imports: [
    CommonModule,
    CallAnalyticsRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
  ]
})
export class CallAnalyticsModule { }
