import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Issue, IssuePopupData } from '../../interfaces/issues';
import { ThreadConversationSummary } from '../../interfaces/threads';
import { format } from 'date-fns';
import { forkJoin } from 'rxjs';

import { IssueService } from '../../services/issue.service';
import { ThreadService } from '../../services/thread.service';
import { UtilityService } from '../../services/utility.service';


@Component({
  selector: 'app-issue-card-list-type',
  templateUrl: './issue-card-list-type.component.html',
  styleUrl: './issue-card-list-type.component.scss'
})
export class IssueCardListTypeComponent implements OnInit, OnChanges {
  @Input() issueData!: Issue;
  closed: boolean = false;
  newState: boolean = false;
  displayedOpenedDate: string = '';
  displayedClosedDate: string = '';
  displayedUpdateDate: string = '';
  headerObj = {
    text: '',
    isShortened: false
  }
  overallConvoSummary: ThreadConversationSummary = {
    summary: '',
  };
  stateOptions: any[] = [{ label: 'Summarized Conversation', value: 'sum'}, { label: 'Chat View', value: 'chat' }];
  selectedState: string = 'sum';
  
  ngOnInit() {
    this.updateDisplayedDates();
  }

  ngOnChanges() {
    this.updateDisplayedDates();
  }

  private updateDisplayedDates() {
    const now = new Date();
    // console.log(typeof this.issueData.dateOpened);
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
    private threadService: ThreadService,
  ) { }

  loading: boolean = false;

  dialogVisible: boolean = false;
  additionalData: IssuePopupData = {
    emails: [],
    subject: '',
    client: '',
    company: '',
    issue: '',
    tags: [],
    status: 'new',
    isOverdue: false,
    dateOpened: new Date(),
    dateClosed: new Date(),
    dateUpdate: new Date(),
    dateOverdue: new Date(),
    firstResponseTime: 0,
    avgResponseTime: 0,
    resolutionTime: 0,
    effectivity: '',
    efficiency: '',
    sentiment: 0,
    id: '',
  };

  errorMessage: string = "";
  
  load() {
    // this is to load the additional data from BE
    this.loading = true;
    this.dialogVisible = true;

    forkJoin({
      issueData: this.issueService.getIssueAdditionalData(this.issueData.id),
      convoSummary: this.threadService.getConversationSummary(this.issueData.id)
    }).subscribe({
      next: data => {
        this.additionalData = data.issueData;
        this.overallConvoSummary = data.convoSummary;
        this.closed = this.additionalData.status === 'closed';
        this.newState = this.additionalData.status === 'new';
        this.headerObj = this.utility.shortenString(this.additionalData.subject, 40);
        this.updateAdditionalDates();
        this.loading = false;
      },
      error: error => {
        this.errorMessage += error;
        this.loading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return format(date, 'EEE, MMM do') + ' @ ' + format(date, 'HH:mm')
  }

  dateOpened: string = '';
  dateClosed: string = '';
  dateUpdate: string = '';
  dateOverdue: string = '';
  firstResponseTime: string = '';
  avgResponseTime: string = '';
  resolutionTime: string = '';

  private updateAdditionalDates() {
    this.dateOpened = this.formatDate(this.additionalData.dateOpened);
    this.dateClosed = this.additionalData.dateClosed ? this.formatDate(this.additionalData.dateClosed) : '';
    this.dateUpdate = this.additionalData.dateUpdate ? this.formatDate(this.additionalData.dateUpdate) : '';
    this.dateOverdue = this.formatDate(this.additionalData.dateOverdue);
    const frt = this.additionalData.firstResponseTime;
    const art = this.additionalData.avgResponseTime;
    const rt = this.additionalData.resolutionTime;
    console.log(frt, art, rt);
    this.firstResponseTime = frt!==undefined ? this.utility.convertMinutes(frt) : 'N/A';
    this.avgResponseTime = art!==undefined ? this.utility.convertMinutes(art) : 'N/A';
    this.resolutionTime = rt!==undefined ? this.utility.convertMinutes(rt) : 'N/A';
  }
}
