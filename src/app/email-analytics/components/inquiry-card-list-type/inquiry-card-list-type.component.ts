import { Component, Input } from '@angular/core';
import { Inquiry, InquiryPopupData } from '../../interfaces/inquiries';
import { InquiryService } from '../../services/inquiry.service';
import { format } from 'date-fns';
@Component({
  selector: 'app-inquiry-card-list-type',
  templateUrl: './inquiry-card-list-type.component.html',
  styleUrl: './inquiry-card-list-type.component.scss'
})
export class InquiryCardListTypeComponent {
  @Input() inquiryData!: Inquiry;

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
    const openedDiff = now.getTime() - this.inquiryData.dateInquired.getTime();
    this.displayedOpenedDate = this.formatTimeDifference(openedDiff);

    if (this.inquiryData.dateAnswered) {
      const closedDiff = now.getTime() - this.inquiryData.dateAnswered.getTime();
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

  constructor(private inquiryService: InquiryService) { }

  loading: boolean = false;
  dialogVisible: boolean = false;
  additionalData: InquiryPopupData = { emails: [
    {
      body: "",
      isClient: false,
      dateTime: new Date()
    }
  ] };
  errorMessage: string = '';

  load() {
    this.loading = true;
    this.inquiryService.getInquiryAdditionalData(this.inquiryData.id).subscribe({
      next: (response: InquiryPopupData) => {
        this.additionalData = response;
        this.loading = false;
        this.dialogVisible = true;
      },
      error: (error: any) => {
        this.errorMessage = error;
        this.dialogVisible = true;
        this.loading = false;
      }
    });
  }
  formatDate(date: Date): string {
    return format(date, 'EEE, MMM do') + ' @ ' + format(date, 'HH:mm')
  }
}
