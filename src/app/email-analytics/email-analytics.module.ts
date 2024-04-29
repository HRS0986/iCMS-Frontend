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

import { NgxEchartsModule } from "ngx-echarts";
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { TooltipModule } from 'primeng/tooltip';

import { DialogModule } from 'primeng/dialog';


import { KeywordCloudComponent } from './components/keyword-cloud/keyword-cloud.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { SummaryCardsContainerComponent } from './components/summary-cards-container/summary-cards-container.component';
import { FilterQueryComponent } from './components/filter-query/filter-query.component';
import { EmailFilteringComponent } from './components/email-filtering/email-filtering.component';
import { EmailTableComponent } from './components/email-table/email-table.component';
import { SettingsComponent } from './components/settings/settings.component';

import { CardModule } from 'primeng/card';


import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { EmailAccCardComponent } from './components/email-acc-card/email-acc-card.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { NotiSendingEmailAccCardComponent } from './components/noti-sending-email-acc-card/noti-sending-email-acc-card.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';



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
    SettingsComponent,
    EmailAccCardComponent,
    NotiSendingEmailAccCardComponent,
    TopicCardComponent,
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
    CardModule,
    TabViewModule,
    ImageModule,
    CheckboxModule,
    ChipsModule,
    InputNumberModule,
    FormsModule,ReactiveFormsModule,
    InputSwitchModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    MultiSelectModule,
    TableModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    DividerModule,
    SkeletonModule
  ],
  providers: [MessageService],
})
export class EmailAnalyticsModule {
}
