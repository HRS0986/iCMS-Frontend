import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";

import { SMAnalyticsRoutingModule } from './social-media-analytics-routing.module';

import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { PanelModule } from "primeng/panel";
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { NgxEchartsModule } from 'ngx-echarts';
import { SkeletonModule } from 'primeng/skeleton';

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CAComponent } from "./pages/campaign-analysis/ca.component";
import { PIComponent } from "./pages/platform-insights/pi.component";
import { settingsComponent } from "./pages/settings/settings.component";
import { SettingsAlerts } from "./pages/settings-alerts/settings-alerts.component";
import { SettingsCampaignComponent } from './pages/settings-campaign/settings-campaign.component';
import { SettingsNotificationsComponent } from './pages/settings-notifications/settings-notifications.component';
import { SettingsThresholdsComponent } from './pages/settings-thresholds/settings-thresholds.component';

import { TabItemComponent } from './components/tab-item/tab-item.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LineChartFacebookComponent } from './components/charts/line-chart-facebook/line-chart-facebook.component'
import { GaugeChartComponent } from './components/charts/gauge-chart/gauge-chart.component';
import { WordCloudSmComponent } from './components/word-cloud-topics/word-cloud-topics.component';
import { WordCloudSm2Component } from './components/word-cloud-keywords/word-cloud-keywords.component';
import { CaCardsComponent } from './components/ca-cards/ca-cards.component';
import { LineChartInstagramComponent } from './components/charts/line-chart-instagram/line-chart-instagram.component';
import { ModalExportPIComponent } from './components/Modals/modal-export-pi/modal-export-pi.component';
import { ModalAddNewCampaignComponent } from './components/Modals/modal-add-new-campaign/modal-add-new-campaign.component';
import { ModalSetAlertComponent } from './components/Modals/modal-set-alert/modal-set-alert.component';
import { ModalSetThresholdComponent } from './components/Modals/modal-set-threshold/modal-set-threshold.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CAComponent,
    PIComponent,
    DoughnutChartComponent,
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
    GaugeChartComponent,
    LineChartFacebookComponent,
    WordCloudSmComponent,
    WordCloudSm2Component,
    CaCardsComponent,
    LineChartInstagramComponent
    
  
    
  ],
  imports: [
    SkeletonModule,
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
    CheckboxModule,
    InputNumberModule,
    TabViewModule,
    ChartModule,
    ButtonModule,
    ModalExportPIComponent,
    ModalAddNewCampaignComponent,
    ModalSetAlertComponent,
    ModalSetThresholdComponent,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
  ]
})
export class SMAnalyticsModule {
}
