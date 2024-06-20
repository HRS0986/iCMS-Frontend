import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardIssueData } from '../../interfaces/dashboard';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-dashboard-small-card',
  templateUrl: './dashboard-small-card.component.html',
  styleUrl: './dashboard-small-card.component.scss'
})
export class DashboardSmallCardComponent implements OnInit {
  smallText: string = "New";
  bigText: string = "Issues";
  number: number = 0;
  context: "same" | "increase" | "decrease" = "same";
  avgMetric: number = 0;
  subscription!: Subscription;

  private pollingInterval = 30000;  // 30 seconds
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    // interval(this.pollingInterval).pipe(
    //   startWith(0),
    //   switchMap(() => this.dashboardService.getDashboardIssueData())
    // ).subscribe((data: DashboardIssueData) => {
    //   this.number = data.newIssues;
    //   this.avgMetric = data.avgIssuePercentage;
    // });
    this.subscription = this.dashboardService.getDashboardIssueData().subscribe((data: DashboardIssueData) => {
      this.number = data.newIssues;
      console.log(data.newIssues);
      this.avgMetric = data.avgIssuePercentage;
    });
  }

  ngOnChanges() {
    if (this.number > this.avgMetric) {
      this.context = "increase";
    } else if (this.number < this.avgMetric) {
      this.context = "decrease";
    } else {
      this.context = "same";
    }

  }
  // BUG: Use ngOnDestroy if you are removing a component and unsubscribe
}