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
      this.keywords = Object.entries(response.data).map(([word, weight]) => ({ word: word, weight: Number(weight) }));
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

  keywords: WordCloudItem[] = []

  ngOnInit() {

    this.callAnalyticsService.getCallStatistics().then(response => {
      console.log(response);
      this.callStatistics = response.data;
      this.isLoadingStatistics = false;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

    this.callAnalyticsService.getSentimentPercentages().then(response => {
      console.log(response);
      this.callSentiments = response.data
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });

  }
  protected readonly Math = Math;
}
