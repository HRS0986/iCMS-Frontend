import { Component, Input } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { EmailMetadataResponse } from '../../interfaces/emails';
import { ThreadSummaryResponse } from '../../interfaces/threads';
@Component({
  selector: 'app-filter-query',
  templateUrl: './filter-query.component.html',
  styleUrl: './filter-query.component.scss'
})
export class FilterQueryComponent {
  dateRange: Date[] | undefined;
  topics: string[] | undefined;
  topicSelected: string | undefined;
  subject: string | undefined;
  sentiments: string[] | undefined;
  sentimentSelected: string | undefined;
  senders: string[] | undefined;
  senderSelected: string | undefined | null;
  receivers: string[] | undefined;
  receiverSelected: string | undefined | null;
  @Input() type: 'email' | 'thread' = 'email';
  filterFunction!: Function;
  emailMetadataResponse: EmailMetadataResponse | undefined;
  threadSummaryResponse: ThreadSummaryResponse | undefined;

  constructor(private filterService: FilterService) { }

  ngOnInit() {

    this.filterFunction = this.type === 'email' ? this.filterService.getEmailMetadata : this.filterService.getThreadSummaries;

    this.topics = [
        "VEGA",
        "TravelBox",
        "ChargeNet",
    ];

    this.sentiments = [
      "Positive",
      "Neutral",
      "Negative",
    ];

    this.senders = [
      "john@gmail.com",
      "kate@hotmail.com",
      "susan@yahoo.com",
    ];

    this.receivers = [
      "vega@codegen.net",
      "support@codegen.net",
      "travelbox@cg.net",
    ];

  }
  clearFilters() {
    this.dateRange = [];
    this.topicSelected = undefined;
    this.subject = '';
    this.sentimentSelected = undefined;
    this.senderSelected = null;
    this.receiverSelected = null;
  }

  applyFilters() {
    this.filterFunction(this.dateRange, this.topicSelected, this.subject, this.sentimentSelected, this.senderSelected, this.receiverSelected).subscribe(
      (response: EmailMetadataResponse | ThreadSummaryResponse) => {
        if (this.type === 'email') {
          this.emailMetadataResponse = response as EmailMetadataResponse;
        } else {
          this.threadSummaryResponse = response as ThreadSummaryResponse;
        }
      }
    );
  }
}

// TODO: applyFilter() need attention
// TODO: complete the search function. Use of data params, use of limits and skips
// TODO: filter component has two forms, one for email and one for thread.
// TODO: bind datasources of email and thread pages to filter components respective variables