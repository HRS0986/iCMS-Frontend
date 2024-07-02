import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-issue-inquiry',
  templateUrl: './dashboard-issue-inquiry.component.html',
  styleUrl: './dashboard-issue-inquiry.component.scss'
})
export class DashboardIssueInquiryComponent {
  dialogVisible = false;

  
  @Input() intervalInDaysStart!: number;
  @Input() intervalInDaysEnd!: number;

  popup() {
    this.dialogVisible = true;
  }

}