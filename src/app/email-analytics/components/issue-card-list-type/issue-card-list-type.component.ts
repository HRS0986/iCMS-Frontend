import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Issue, IssuePopupData } from '../../interfaces/issues';
import { format, longFormatters } from 'date-fns';

import { IssueService } from '../../services/issue.service';
import { UtilityService } from '../../services/utility.service';
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
  displayedUpdateDate: string = '';
  headerObj = {
    text: '',
    isShortened: false
  }

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

    if (this.issueData.dateUpdate) {
      const updateDiff = now.getTime() - this.issueData.dateUpdate.getTime();
      this.displayedUpdateDate = this.formatTimeDifference(updateDiff);
    }

    if (this.issueData.dateClosed) {
      const closedDiff = now.getTime() - this.issueData.dateClosed.getTime();
      this.displayedClosedDate = this.formatTimeDifference(closedDiff);
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

  constructor(
    private issueService: IssueService,
    private utility: UtilityService,
  ) { }

  loading: boolean = false;
  dialogVisible: boolean = false;
  additionalData: IssuePopupData = { emails: [
    {
      body: "",
      isClient: false,
      dateTime: new Date()
    }
  ] };
  errorMessage: string = "";
  
  lorem = "lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  originalHeader = this.lorem;
  // originalHeader = "hello world";
  load() {
    // this is to load the additional data from BE
    // wait until all data available, then display the popup showing the additional data
    console.log('clicked me')
      this.loading = true;
      this.dialogVisible = true;
      this.issueService.getIssueAdditionalData(this.issueData.id).subscribe({
        next: data => {
          this.headerObj = this.utility.shortenString(this.originalHeader, 20);
          this.additionalData = data;
          this.loading = false;
        },
        error: error => {
          this.errorMessage = error;
          this.loading = false;
        }
      });
  }

  formatDate(date: Date): string {
    return format(date, 'EEE, MMM do') + ' @ ' + format(date, 'HH:mm')
  }
}
