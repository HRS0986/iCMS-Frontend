import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { CallAnalyticsService } from "../../services/call-analytics.service";
import { CallStatistics, OverallCallStatusPercentages, SentimentPercentages } from "../../types";
import { WordCloudItem } from "../../../shared/types";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private callAnalyticsService: CallAnalyticsService) {
    this.callAnalyticsService.getAllKeywords().then(response => {
      this.myData = Object.entries(response.data).map(([word, weight]) => ({ word: word, weight: Number(weight) }));
    }).catch(err => {
      console.log(err);
    });
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Dashboard"}
  ];

  callStatistics!: CallStatistics;
  callSentiments!: SentimentPercentages;

  myData: WordCloudItem[] = []

  ngOnInit() {
    this.callAnalyticsService.getCallStatistics().then(response => {
      console.log(response);
      this.callStatistics = response.data;
    }).catch(err => {
      console.log(err);
    });
    this.callAnalyticsService.getSentimentPercentages().then(response => {
      console.log(response);
      this.callSentiments = response.data
    }).catch(err => {
      console.log(err);
    });


  }

  calculateCallStatusPercentage(positive: number, negative: number, neutral: number): OverallCallStatusPercentages {
    let total = positive + negative + neutral;
    let negativePercentage = negative * 100 / total;
    let positivePercentage = positive * 100 / total;
    let neutralPercentage = neutral * 100 / total;

    return {
      positive: positivePercentage,
      negative: negativePercentage,
      neutral: neutralPercentage
    }
  }

    protected readonly Math = Math;
}
