import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from "primeng/api";
import { CallAnalyticsService } from "../../services/call-analytics.service";
import {
  BestOperatorItem,
  CallStatistics,
  OperatorAnalyticsOverTimeRecord,
  SentimentOverTimeDataSet,
  SentimentPercentages
} from "../../types";
import { WordCloudItem } from "../../../shared/types";
import { DoughnutChartComponent } from "../doughnut-chart/doughnut-chart.component";
import { LineAreaChartComponent } from "../line-area-chart/line-area-chart.component";
import { BarChartComponent } from "../horizontal-bar-chart/bar-chart.component";
import { StackedBarChartComponent } from "../stacked-bar-chart/stacked-bar-chart.component";
import { WordcloudComponent } from "../../../shared/shared-components/wordcloud/wordcloud.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild('dChartComp') dChart!: DoughnutChartComponent;
  @ViewChild('lChartComp') lChart!: LineAreaChartComponent;
  @ViewChild('bChartComp') bChart!: BarChartComponent;
  @ViewChild('sChartComp') sChart!: StackedBarChartComponent;
  @ViewChild('keywordCloud') keywordCloud!: WordcloudComponent;

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Dashboard"}
  ];

  start = "2024-06-29-16-29-00"
  end = "2024-06-30-18-36-30"
  isLoadingStatistics = true;
  isLoadingPercentages = true;
  isLoadingSentimentsOverTime = true;
  isLoadingTopics = true;
  isLoadingOperatorCalls = true;
  isLoadingOperatorRankings = true;
  isLoadingKeywords = true;
  callStatistics!: CallStatistics;
  callSentiments!: SentimentPercentages;
  sentimentOverTime!: SentimentOverTimeDataSet[];
  operatorCallsOverTime!: OperatorAnalyticsOverTimeRecord[];
  operatorRankings!: BestOperatorItem[];
  topicDistribution!: { [KeyFilter: string]: number }
  keywords: WordCloudItem[] = []
  protected readonly Math = Math;

  constructor(private callAnalyticsService: CallAnalyticsService, private cdr: ChangeDetectorRef) {
    this.callAnalyticsService.getAllKeywords(this.start, this.end).then(response => {
      this.keywords = Object.entries(response.data).map(([word, weight]) => (
        {word: word, weight: Number(weight)}));
      this.isLoadingKeywords = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });
  }

  ngOnInit() {
    this.reloadData(this.start, this.end);
  }

  reloadData(start: string, end: string) {
    this.callAnalyticsService.getCallStatistics(start, end).then(response => {
      this.callStatistics = response.data;
      this.isLoadingStatistics = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getSentimentPercentages(start, end).then(response => {
      this.callSentiments = response.data
      console.log(this.callSentiments)
      if (this.dChart) this.dChart.refreshChart(response.data);
      this.isLoadingPercentages = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getSentimentOverTime(start, end).then(response => {
      this.sentimentOverTime = response.data;
      if (this.lChart) this.lChart.refreshChart(response.data);
      this.isLoadingSentimentsOverTime = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getTopicsDistribution(start, end).then(response => {
      this.topicDistribution = response.data;
      if (this.bChart) this.bChart.refreshChart(response.data);
      this.isLoadingTopics = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getOperatorCallsOverTime(start, end).then(response => {
      this.operatorCallsOverTime = response.data;
      if (this.sChart) this.sChart.refreshChart(response.data);
      this.isLoadingOperatorCalls = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getOperatorRatings(start, end).then(response => {
      this.operatorRankings = response.data;
      this.isLoadingOperatorRankings = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getAllKeywords(start, end).then(response => {
      this.keywords = Object.entries(response.data).map(([word, weight]) => ({word: word, weight: Number(weight)}));
      if (this.keywordCloud) this.keywordCloud.refreshChart(this.keywords);
      this.isLoadingKeywords = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });
  }
}
