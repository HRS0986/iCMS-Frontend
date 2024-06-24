import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-issue-card',
  templateUrl: './dashboard-issue-card.component.html',
  styleUrl: './dashboard-issue-card.component.scss'
})
export class DashboardIssueCardComponent {
  smallText: string = "New";
  bigText: string = "Issues";
  number: number = 1250;
  displayedNumber: string = "1.25K";
  avgMetric: number = 3.5;
  context = "increase";
}
