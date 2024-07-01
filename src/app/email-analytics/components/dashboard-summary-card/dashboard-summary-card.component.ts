import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary-card',
  templateUrl: './dashboard-summary-card.component.html',
  styleUrl: './dashboard-summary-card.component.scss'
})
export class DashboardSummaryCardComponent {

  @Input() intervalInDaysStart!: number;
  @Input() intervalInDaysEnd!: number;

  loading: boolean = false;
  dialogVisible: boolean = false;

  emails_done_percentage!: number;
  issues_done_percentage!: number;
  inquiries_done_percentage!: number;
  suggestions_done_percentage!: number;
  avg_response_time!: number;
  avg_resolution_time!: number;
  overall_sentiment!: number;
  
  total_issues = 10000;
  total_inquiries = 15000;
  total_suggestions = 1500;
  total_emails = this.total_issues + this.total_inquiries + this.total_suggestions;
  issues_remaining = 5000;
  inquiries_remaining = 8000;
  suggestions_remaining = 200;
  emails_remaining = this.issues_remaining + this.inquiries_remaining + this.suggestions_remaining;

  display_total_emails!: string;
  display_total_issues!: string;
  display_total_inquiries!: string;
  display_total_suggestions!: string;

  display_emails_remaining!: string;
  displayed_issues_remaining!: string;
  displayed_inquiries_remaining!: string;  
  displayed_suggestions_remaining!: string;

  avg_response_time_displayed!: string;
  /**
   * Adds a suffix to a number to represent a shortened value.
   */
  addSuffix(value: number): string {
    if (value > 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else if (value > 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else {
      return value.toString();
    }
  }

  calcDonePercentage(remaining: number, total: number): number {
    return ((total - remaining) / total) * 100;
  }

  ngOnInit() {
    this.display_total_emails = this.addSuffix(this.total_emails);
    this.display_total_issues = this.addSuffix(this.total_issues);
    this.display_total_inquiries = this.addSuffix(this.total_inquiries);
    this.display_total_suggestions = this.addSuffix(this.total_suggestions);
    this.display_emails_remaining = this.addSuffix(this.emails_remaining);
    this.displayed_issues_remaining = this.addSuffix(this.issues_remaining);
    this.displayed_inquiries_remaining = this.addSuffix(this.inquiries_remaining);
    this.displayed_suggestions_remaining = this.addSuffix(this.suggestions_remaining);

    this.emails_done_percentage = this.calcDonePercentage(this.emails_remaining, this.total_emails);
    this.issues_done_percentage = this.calcDonePercentage(this.issues_remaining, this.total_issues);
    this.inquiries_done_percentage = this.calcDonePercentage(this.inquiries_remaining, this.total_inquiries);
    this.suggestions_done_percentage = this.calcDonePercentage(this.suggestions_remaining, this.total_suggestions);

    this.avg_response_time = 45;
    this.avg_response_time_displayed = this.avg_response_time + 'mins';
  }

  load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogVisible = true;
    }, 1000);
  }
}
