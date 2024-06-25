import { Component, Input } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { EmailMetadataResponse } from '../../interfaces/emails';
import { ThreadSummaryResponse } from '../../interfaces/threads';

@Component({
  selector: 'app-filter-query-suggestions',
  templateUrl: './filter-query-suggestions.component.html',
  styleUrl: './filter-query-suggestions.component.scss'
})
export class FilterQuerySuggestionsComponent {

  dateRange: Date[] | undefined;
  products: string[] | undefined;
  productSelected: string | undefined;
  recipientEmails: string[] | undefined;
  recipientEmailSelected: string | undefined;
  receivers: string[] | undefined;
  receiverSelected: string | undefined | null;
  @Input() type: 'email' | 'thread' = 'email';
  filterFunction!: Function;
  emailMetadataResponse: EmailMetadataResponse | undefined;
  threadSummaryResponse: ThreadSummaryResponse | undefined;

  constructor(private filterService: FilterService) { }

  ngOnInit() {

    this.filterFunction = this.type === 'email' ? this.filterService.getEmailMetadata : this.filterService.getThreadSummaries;

    this.products = [
        "VEGA",
        "TravelBox",
        "ChargeNet",
    ];

    this.recipientEmails = [
      "readingEmail1",
      "readingEmail2",
      "readingEmail3",
    ];


    this.receivers = [
      "vega@codegen.net",
      "support@codegen.net",
      "travelbox@cg.net",
    ];

  }
  clearFilters() {
    this.dateRange = [];
    this.productSelected = undefined;
    this.recipientEmailSelected = undefined;
    this.receiverSelected = null;
  }

  applyFilters() {
    this.filterFunction(this.dateRange, this.productSelected, this.recipientEmailSelected, this.receiverSelected).subscribe(
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
