import { Component } from '@angular/core';

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

  ngOnInit() {
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
}
