import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { SummaryService } from '../../services/summary.service';
import { SearchService } from '../../services/search.service';
import { Summary } from '../../interfaces/summary';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-summary-cards-container',
  templateUrl: './summary-cards-container.component.html',
  styleUrl: './summary-cards-container.component.scss'
})
export class SummaryCardsContainerComponent implements OnInit {
  private searchTerms = new Subject<string>();
  summaries: Summary[] = [];

  constructor(private summaryService: SummaryService, private searchService: SearchService) { 
    this.searchTerms.pipe(
      debounceTime(300), // Adjust the debounce time as needed (in milliseconds)
      distinctUntilChanged(),
      switchMap((query: string) => this.searchService.searchSummary(query))
    ).subscribe((results: any[]) => {
      this.summaries = results;
    });
  }

  ngOnInit(): void {
    this.onGetSummaries();
  }

  onGetSummaries(): void {
    this.summaryService.getSummaries().subscribe((response) => this.summaries = response);
  }

  search(query: string): void {
    this.searchTerms.next(query);
  }
  
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Summary"}
  ];
}
