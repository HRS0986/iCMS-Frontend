import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Dashboard"}
  ];
  start = "2024-06-29-16-29-00"
  end = "2024-06-30-18-36-30"
  isLoadingStatistics = true;
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
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });
  }

  ngOnInit() {
    this.reloadData(this.start, this.end);
  }

  reloadData(start: string, end: string) {
    console.log('start', start)
    console.log('end', end)
    this.callAnalyticsService.getCallStatistics(start, end).then(response => {
      this.callStatistics = response.data;
      this.isLoadingStatistics = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getSentimentPercentages(start, end).then(response => {
      this.callSentiments = response.data
      this.cdr.detectChanges();
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getSentimentOverTime(start, end).then(response => {
      this.sentimentOverTime = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getTopicsDistribution(start, end).then(response => {
      this.topicDistribution = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getOperatorCallsOverTime(start, end).then(response => {
      this.operatorCallsOverTime = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getOperatorRatings(start, end).then(response => {
      this.operatorRankings = response.data;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getAllKeywords(start, end).then(response => {
      this.keywords = Object.entries(response.data).map(([word, weight]) => ({word: word, weight: Number(weight)}));
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });
  }
}
