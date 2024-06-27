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
import { AutoCompleteModule } from 'primeng/autocomplete';

import { KeywordCloudComponent } from './components/keyword-cloud/keyword-cloud.component';
// import { EmailFilteringComponent } from './components/email-filtering/email-filtering.component';
// import { EmailTableComponent } from './components/email-table/email-table.component';
import { SettingsComponent } from './components/settings/settings.component';
import { GaugeChartComponent } from './components/gauge-chart/gauge-chart.component';

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
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { CalendarModule } from 'primeng/calendar';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { MultiHorizontalBarChartComponent } from './components/multi-horizontal-bar-chart/multi-horizontal-bar-chart.component';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';

import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { StatCardMgrAnalyticsComponent } from './components/stat-card-mgr-analytics/stat-card-mgr-analytics.component';
import { EffiEffecDonoughtChartComponent } from './components/effi-effec-donought-chart/effi-effec-donought-chart.component';
import { ProgressDonoughtChartComponent } from './components/progress-donought-chart/progress-donought-chart.component';
import { MultiVerticalBarChartComponent } from './components/multi-vertical-bar-chart/multi-vertical-bar-chart.component';
import { DynamicStackedBarChartComponent } from './components/dynamic-stacked-bar-chart/dynamic-stacked-bar-chart.component';
import { BestWorstCardComponent } from './components/best-worst-card/best-worst-card.component';
import { DynamicHorizontalBarchartComponent } from './components/dynamic-horizontal-barchart/dynamic-horizontal-barchart.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SuggestionCardComponent } from './components/suggestion-card/suggestion-card.component';
import { SuggestionFilteringComponent } from './components/suggestion-filtering/suggestion-filtering.component';
import { PaginatorModule } from 'primeng/paginator';
import { IssueCardListTypeComponent } from './components/issue-card-list-type/issue-card-list-type.component';
import { IssueDataviewComponent } from './components/issue-dataview/issue-dataview.component';
import { SuggestionCardListTypeComponent } from './components/suggestion-card-list-type/suggestion-card-list-type.component';
import { InquiryCardListTypeComponent } from './components/inquiry-card-list-type/inquiry-card-list-type.component';
import { InquiryDataviewComponent } from './components/inquiry-dataview/inquiry-dataview.component';
import { DashboardSmallCardComponent } from './components/dashboard-small-card/dashboard-small-card.component';
import { AuthorizationMessageComponent } from './components/authorization-message/authorization-message.component';
import { DashboardIssueCardComponent } from './components/dashboard-issue-card/dashboard-issue-card.component';
import { DashboardInquiryCardComponent } from './components/dashboard-inquiry-card/dashboard-inquiry-card.component';
import { DashboardSuggestionCardComponent } from './components/dashboard-suggestion-card/dashboard-suggestion-card.component';
import { DashboardSentimentCardComponent } from './components/dashboard-sentiment-card/dashboard-sentiment-card.component';
import { DashboardSummaryCardComponent } from './components/dashboard-summary-card/dashboard-summary-card.component';
import { DashboardActionablesComponent } from './components/dashboard-actionables/dashboard-actionables.component';
import { DashboardResponsetimeComponent } from './components/dashboard-responsetime/dashboard-responsetime.component';
import { FilteringComponent } from './components/filtering/filtering.component';

import { MessagesModule } from 'primeng/messages';

import { ThreadDataviewComponent } from './components/thread-dataview/thread-dataview.component';
import { ThreadCardListTypeComponent } from './components/thread-card-list-type/thread-card-list-type.component';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [
    DashboardComponent,
    HorizontalBarChartComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    StatCardComponent,
    KeywordCloudComponent,
    // EmailFilteringComponent,
    // EmailTableComponent,
    SettingsComponent,
    EmailAccCardComponent,
    NotiSendingEmailAccCardComponent,
    TopicCardComponent,
    WordCloudComponent,
    StackedBarChartComponent,
    MultiHorizontalBarChartComponent,

    GaugeChartComponent,
    Dashboard2Component,
    StatCardMgrAnalyticsComponent,
    EffiEffecDonoughtChartComponent,
    ProgressDonoughtChartComponent,
    MultiVerticalBarChartComponent,
    DynamicStackedBarChartComponent,
    BestWorstCardComponent,
    DynamicHorizontalBarchartComponent,
    SuggestionCardComponent,
    SuggestionFilteringComponent,
    IssueCardListTypeComponent,
    IssueDataviewComponent,
    SuggestionCardListTypeComponent,
    InquiryCardListTypeComponent,
    InquiryDataviewComponent,
    DashboardSmallCardComponent,
    AuthorizationMessageComponent,
    DashboardIssueCardComponent,
    DashboardInquiryCardComponent,
    DashboardSuggestionCardComponent,
    DashboardSentimentCardComponent,
    DashboardSummaryCardComponent,
    DashboardActionablesComponent,
    DashboardResponsetimeComponent,
    FilteringComponent,
    ThreadDataviewComponent,
    ThreadCardListTypeComponent,
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
    CalendarModule,
    PanelModule, 
    DropdownModule,
    DividerModule,
    PaginatorModule,
    DividerModule,
    SkeletonModule,
    SkeletonModule,
    ProgressBarModule,
    AutoCompleteModule,
    MessagesModule,
    ToggleButtonModule
  ],
  providers: [MessageService],
})
export class EmailAnalyticsModule {
}
