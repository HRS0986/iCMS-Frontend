import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-account-insights',
  templateUrl: './dashboard-account-insights.component.html',
  styleUrl: './dashboard-account-insights.component.scss'
})
export class DashboardAccountInsightsComponent {
  displayedAccounts: any;
  dialogVisible = false;

  @Input() intervalInDaysStart!: number;
  @Input() intervalInDaysEnd!: number;

  ngOnInit() {
    this.displayedAccounts = [
      {
        no: 1,
        name: 'Googlsddssdsddssddsde',
        count: 5000,
        sentiment: -0.2,
      },
      {
        no: 2,
        name: 'Facebook',
        count: 3000,
        sentiment: 0.1,
      },
      {
        no: 3,
        name: 'Twitter',
        count: 2000,
        sentiment: 0.3,
      },
      {
        no: 4,
        name: 'Instagram',
        count: 1000,
        sentiment: 0.5,
      }
    ]
  }

  popup() {
    this.dialogVisible = true;
  }
}
