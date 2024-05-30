import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Issue } from '../../interfaces/issues';

import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { formatDate } from '@angular/common';
// import product interface
// import product service

@Component({
  selector: 'app-issue-card-list-type',
  templateUrl: './issue-card-list-type.component.html',
  styleUrl: './issue-card-list-type.component.scss'
})
export class IssueCardListTypeComponent implements OnInit, OnChanges {
  @Input() issueData!: Issue;

  displayedOpenedDate: string = '';
  displayedClosedDate: string = '';

  ngOnInit() {
    this.updateDisplayedDates();
  }

  ngOnChanges() {
    this.updateDisplayedDates();
  }

  private updateDisplayedDates() {
    const now = new Date();
    const openedDiff = now.getTime() - this.issueData.dateOpened.getTime();
    this.displayedOpenedDate = this.formatTimeDifference(openedDiff);

    if (this.issueData.dateClosed) {
      const closedDiff = now.getTime() - this.issueData.dateClosed.getTime();
      this.displayedClosedDate = this.formatTimeDifference(closedDiff);
    } else {
      this.displayedClosedDate = '';
    }
  }

  private formatTimeDifference(diff: number): string {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return 'just now';
    }
  }
}
