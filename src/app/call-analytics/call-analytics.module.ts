import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAnalyticsRoutingModule } from './call-analytics-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { PanelModule } from "primeng/panel";
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { ChartModule } from "primeng/chart";
import { LineAreaChartComponent } from './components/line-area-chart/line-area-chart.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { GaugeChartComponent } from './components/gauge-chart/gauge-chart.component';
import { NgxEchartsModule } from "ngx-echarts";
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';
import { RecentCallsCardComponent } from './components/recent-calls-card/recent-calls-card.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { TooltipModule } from 'primeng/tooltip';
import { CallSummaryChartComponent } from './components/call-summary-chart/call-summary-chart.component';
import { CallRecordingsComponent } from './components/call-recordings/call-recordings.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ToastModule } from 'primeng/toast';
import { CallAnalyticsService } from "./services/call-analytics.service";
import { CardModule } from 'primeng/card';

import { SettingsComponent } from './components/settings/settings.component';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    DashboardComponent,
    StatCardComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    WordCloudComponent,
    GaugeChartComponent,
    HorizontalBarChartComponent,
    RecentCallsCardComponent,
    CallRecordingsComponent,
    CallSummaryChartComponent,
    FileUploadComponent,
    CallRecordingsComponent,
    RecentCallsCardComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    CallAnalyticsRoutingModule,
    CardModule,
    SharedModule,
    ToastModule,
    PanelModule,
    ChartModule,
    ButtonModule,
    TooltipModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    DataViewModule,
    TagModule,
    DialogModule,
    TabViewModule,
    ImageModule,
    CheckboxModule,
    InputNumberModule,
    ChipsModule,
    FormsModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  providers: [
    CallAnalyticsService
  ]
})
export class CallAnalyticsModule {}
