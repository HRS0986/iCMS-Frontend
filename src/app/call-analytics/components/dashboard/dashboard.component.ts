import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { CallAnalyticsService } from "../../services/call-analytics.service";
import {
  BestOperatorItem,
  CallStatistics, OperatorAnalyticsOverTimeRecord,
  OverallCallStatusPercentages,
  SentimentOverTimeDataSet,
  SentimentPercentages
} from "../../types";
import { WordCloudItem } from "../../../shared/types";
import { KeyFilter } from "primeng/keyfilter";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private callAnalyticsService: CallAnalyticsService) {
    this.callAnalyticsService.getAllKeywords().then(response => {
      this.keywords = Object.entries(response.data).map(([word, weight]) => ({ word: word, weight: Number(weight) }));
      console.log(this.keywords)
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Dashboard"}
  ];

  isLoadingStatistics = true;
  callStatistics!: CallStatistics;
  callSentiments!: SentimentPercentages;
  sentimentOverTime!: SentimentOverTimeDataSet[];
  operatorCallsOverTime!: OperatorAnalyticsOverTimeRecord[];
  operatorRankings!: BestOperatorItem[];
  topicDistribution!: { [KeyFilter: string]: number }

  keywords: WordCloudItem[] = []

  ngOnInit() {

    this.callAnalyticsService.getCallStatistics().then(response => {
      this.callStatistics = response.data;
      this.isLoadingStatistics = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getSentimentPercentages().then(response => {
      this.callSentiments = response.data
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    const start = "2024-06-29-16-29-00"
    const end = "2024-06-30-18-36-30"

    this.callAnalyticsService.getSentimentOverTime(start, end).then(response => {
      this.sentimentOverTime = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {});

    this.callAnalyticsService.getTopicsDistribution().then(response => {
      this.topicDistribution = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {});

    this.callAnalyticsService.getOperatorCallsOverTime().then(response => {
      this.operatorCallsOverTime = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {});

    this.callAnalyticsService.getOperatorRatings().then(response => {
      this.operatorRankings = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {});

  }
  protected readonly Math = Math;
}
