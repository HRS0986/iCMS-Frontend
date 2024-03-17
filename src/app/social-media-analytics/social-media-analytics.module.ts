import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CAComponent } from "./pages/campaign-analysis/ca.component";
import { PIComponent } from "./pages/platform-insights/pi.component";
import { settingsComponent } from "./pages/settings/settings.component";

import { SMAnalyticsRoutingModule } from './social-media-analytics-routing.module';



import { TabItemComponent } from './components/tab-item/tab-item.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { PanelModule } from "primeng/panel";
// import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
// import { ChartModule } from "primeng/chart";
// import { LineAreaChartComponent } from './components/charts/line-area-chart/line-area-chart.component';
// import { WordCloudComponent } from './pages/word-cloud/word-cloud.component';
// import { GaugeChartComponent } from './pages/gauge-chart/gauge-chart.component';
// import { NgxEchartsModule } from "ngx-echarts";
// import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
// import { ButtonModule } from 'primeng/button';
// import { DataViewModule } from "primeng/dataview";
// import { TagModule } from "primeng/tag";
// import { TooltipModule } from 'primeng/tooltip';
// import { DialogModule } from 'primeng/dialog';
// import { BreadcrumbModule } from "primeng/breadcrumb";


// import { FileUploadModule } from 'primeng/fileupload';
// import { ToastModule } from 'primeng/toast';
// import { CardModule } from 'primeng/card';

// import { TabViewModule } from 'primeng/tabview';
// import { ImageModule } from 'primeng/image';
// import { CheckboxModule } from 'primeng/checkbox';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { ChipsModule } from 'primeng/chips';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InputSwitchModule } from 'primeng/inputswitch';
// import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    DashboardComponent,
    CAComponent,
    settingsComponent,
    PIComponent,
    // HorizontalBarChartComponent,
    // DoughnutChartComponent,
    // LineAreaChartComponent,
  ],
  imports: [
    PanelModule,
    CommonModule,
    SharedModule,
    SMAnalyticsRoutingModule,
    TabItemComponent,
    TabsComponent,
    // CardModule,
    // ToastModule,
    // TabViewModule,
    // ImageModule,
    // CheckboxModule,
    // InputNumberModule,
    // ChipsModule,
    // FormsModule,
    // InputSwitchModule,
    // InputTextModule,
    // ReactiveFormsModule,
    // FileUploadModule,
    // ChartModule,
    // ButtonModule,
    // TooltipModule,
    // NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    // DataViewModule,
    // TagModule,
    // DialogModule,
  ]
})
export class SMAnalyticsModule {
}
