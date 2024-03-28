import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

import { EmailAnalyticsRoutingModule } from './email-analytics-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { PanelModule } from "primeng/panel";
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { ChartModule } from "primeng/chart";
import { LineAreaChartComponent } from './components/line-area-chart/line-area-chart.component';
// import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
// import { GaugeChartComponent } from './components/gauge-chart/gauge-chart.component';
import { NgxEchartsModule } from "ngx-echarts";
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';
// import { RecentCallsCardComponent } from './components/recent-calls-card/recent-calls-card.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { TooltipModule } from 'primeng/tooltip';
// import { CallSummaryChartComponent } from './components/call-summary-chart/call-summary-chart.component';
// import { CallRecordingsComponent } from './components/call-recordings/call-recordings.component';
import { DialogModule } from 'primeng/dialog';
import { KeywordCloudComponent } from './components/keyword-cloud/keyword-cloud.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { SummaryCardsContainerComponent } from './components/summary-cards-container/summary-cards-container.component';
import { FilterQueryComponent } from './components/filter-query/filter-query.component';
import { EmailFilteringComponent } from './components/email-filtering/email-filtering.component';
import { EmailTableComponent } from './components/email-table/email-table.component';
import { ViewThreadComponent } from './components/view-thread/view-thread.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HorizontalBarChartComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    StatCardComponent,
    KeywordCloudComponent,
    SummaryCardComponent,
    SummaryCardsContainerComponent,
    FilterQueryComponent,
    EmailFilteringComponent,
    EmailTableComponent,
    ViewThreadComponent,
  ],
  imports: [
    CommonModule,
    EmailAnalyticsRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
    ButtonModule,
    TooltipModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    DataViewModule,
    TagModule,
    DialogModule,
    ChipModule,
  ]
})
export class EmailAnalyticsModule {
}
