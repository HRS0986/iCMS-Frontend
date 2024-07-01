import { Component, Input } from '@angular/core';
import { Inquiry, InquiryPopupData } from '../../interfaces/inquiries';
import { InquiryService } from '../../services/inquiry.service';
import { format } from 'date-fns';
import { UtilityService } from '../../services/utility.service';
import { ThreadService } from '../../services/thread.service';
import { ThreadConversationSummary } from '../../interfaces/threads';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-inquiry-card-list-type',
  templateUrl: './inquiry-card-list-type.component.html',
  styleUrl: './inquiry-card-list-type.component.scss'
})
export class InquiryCardListTypeComponent {
  @Input() inquiryData!: Inquiry;

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
    const openedDiff = now.getTime() - this.inquiryData.dateOpened.getTime();
    this.displayedOpenedDate = this.formatTimeDifference(openedDiff);

    if (this.inquiryData.dateUpdate) {
      const updateDiff = now.getTime() - this.inquiryData.dateUpdate.getTime();
      this.displayedUpdateDate = this.formatTimeDifference(updateDiff);
    } 

    if (this.inquiryData.dateClosed) {
      const closedDiff = now.getTime() - this.inquiryData.dateClosed.getTime();
      this.displayedClosedDate = this.formatTimeDifference(closedDiff)
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
    private inquiryService: InquiryService,
    private utility: UtilityService,
    private threadService: ThreadService,
  ) { }

  loading: boolean = false;
  dialogVisible: boolean = false;
  additionalData: InquiryPopupData = {
    emails: [],
    subject: '',
    client: '',
    company: '',
    inquiry: '',
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

  errorMessage: string = '';

  load() {
    this.loading = true;
    this.dialogVisible = true;

    forkJoin({
      convoSummary: this.threadService.getConversationSummary(this.inquiryData.id),
      inquiryData: this.inquiryService.getInquiryAdditionalData(this.inquiryData.id)
    }).subscribe({
      next: (data: any) => {
        this.overallConvoSummary = data.convoSummary;
        this.additionalData = data.inquiryData;
        this.closed = this.additionalData.status === 'closed';
        this.newState = this.additionalData.status === 'new';
        this.headerObj = this.utility.shortenString(this.additionalData.subject, 40);
        this.updateAdditionalDates();
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error;
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
