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
import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CAComponent,
    PIComponent,
    HorizontalBarChartComponent,
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
    CheckboxModule,
    InputNumberModule,
    TabViewModule,
    ChartModule,
    ButtonModule,
  ]
})
export class SMAnalyticsModule {
}
