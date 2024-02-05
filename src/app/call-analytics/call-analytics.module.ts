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
import {TagCloudComponent} from "angular-tag-cloud-module";
import { GaugeChartComponent } from './components/gauge-chart/gauge-chart.component';
import {NgxEchartsDirective, NgxEchartsModule} from "ngx-echarts";
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StatCardComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    WordCloudComponent,
    GaugeChartComponent,
    HorizontalBarChartComponent
  ],
  imports: [
    CommonModule,
    CallAnalyticsRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
    TagCloudComponent,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ]
})
export class CallAnalyticsModule { }
