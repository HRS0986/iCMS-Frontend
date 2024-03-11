import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { CallAnalyticsService } from "../../services/call-analytics.service";
import { CallStatistics, OverallCallStatusPercentages } from "../../types";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private callAnalyticsService: CallAnalyticsService) {
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Dashboard"}
  ];

  callStatistics!: CallStatistics;

  ngOnInit() {
    this.callStatistics = this.callAnalyticsService.getCallStatistics();
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

}
