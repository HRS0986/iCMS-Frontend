import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";


import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CAComponent } from "./pages/campaign-analysis/ca.component";
import { PIComponent } from "./pages/platform-insights/pi.component";
import { settingsComponent } from "./pages/settings/settings.component";



import { SMAnalyticsRoutingModule } from './social-media-analytics-routing.module';

import { SettingsAlerts } from "./pages/settings-alerts/settings-alerts.component";

import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';


import { TabItemComponent } from './components/tab-item/tab-item.component';
import { TabsComponent } from './components/tabs/tabs.component';

 import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SliderModule } from 'primeng/slider';

import { ChartModule } from 'primeng/chart';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { PanelModule } from "primeng/panel";
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
// import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
// import { LineAreaChartComponent } from './components/charts/line-area-chart/line-area-chart.component';
// import { WordCloudComponent } from './pages/word-cloud/word-cloud.component';
// import { GaugeChartComponent } from './pages/gauge-chart/gauge-chart.component';
// import { NgxEchartsModule } from "ngx-echarts";
import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
// import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { ButtonModule } from 'primeng/button';
import { SettingsCampaignComponent } from './pages/settings-campaign/settings-campaign.component';
import { SettingsNotificationsComponent } from './pages/settings-notifications/settings-notifications.component';
// import { DataViewModule } from "primeng/dataview";
// import { TagModule } from "primeng/tag";
// import { TooltipModule } from 'primeng/tooltip';
// import { DialogModule } from 'primeng/dialog';
// import { BreadcrumbModule } from "primeng/breadcrumb";
import { ChipsModule } from 'primeng/chips';
import { TabViewModule } from 'primeng/tabview';
import { SettingsThresholdsComponent } from './pages/settings-thresholds/settings-thresholds.component';
// import { FileUploadModule } from 'primeng/fileupload';
// import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

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
    PIComponent,
    HorizontalBarChartComponent,
    DoughnutChartComponent,
    //LineAreaChartComponent,
    SettingsAlerts,
    ProgressBarComponent,
    SettingsCampaignComponent,
    SettingsNotificationsComponent,
    settingsComponent,
    ProgressBarComponent,
    SettingsAlerts,
    ProgressBarComponent,
    SettingsCampaignComponent,
    SettingsNotificationsComponent,
    SettingsThresholdsComponent,
    
    
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
    CardModule,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    ChipsModule,
    InputSwitchModule,
    ChartModule,
    TableModule,
    ButtonModule,
    ChartModule,
    // CardModule,
    // ToastModule,
    // TabViewModule,
    // ImageModule,
     CheckboxModule,
     InputNumberModule,
     TabViewModule,
    // ChipsModule,
    // FormsModule,
    // InputSwitchModule,
    // InputTextModule,
    // ReactiveFormsModule,
    // FileUploadModule,
    ChartModule,
    ButtonModule,
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
