import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SMAnalyticsRoutingModule } from './social-media-analytics-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CAComponent } from "./pages/campaign-analysis/ca.component";
import { PIComponent } from "./pages/platform-insights/pi.component";
import { settingsComponent } from "./pages/settings/settings.component";
import { SharedModule } from "../shared/shared.module";
import { PanelModule } from "primeng/panel";
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { ChartModule } from "primeng/chart";
import { LineAreaChartComponent } from './components/charts/line-area-chart/line-area-chart.component';
// import { WordCloudComponent } from './pages/word-cloud/word-cloud.component';
// import { GaugeChartComponent } from './pages/gauge-chart/gauge-chart.component';
import { NgxEchartsModule } from "ngx-echarts";
import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    HorizontalBarChartComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    CAComponent,
    PIComponent,
    settingsComponent,
  ],
  imports: [
    CommonModule,
    SMAnalyticsRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
    ButtonModule,
    TooltipModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    DataViewModule,
    TagModule,
    DialogModule,
  ]
})
export class SMAnalyticsModule {
}
