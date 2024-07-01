import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataViewLazyLoadEvent, DataView } from 'primeng/dataview';
import { SuggestionService } from '../../services/suggestion.service';

import { Suggestion, SuggestionResponse } from '../../interfaces/suggestions';

import { Filter } from '../../interfaces/filters';


interface PageEvent {
  first: number | undefined;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-suggestion-filtering',
  templateUrl: './suggestion-filtering.component.html',
  styleUrl: './suggestion-filtering.component.scss'
})
export class SuggestionFilteringComponent {

  @ViewChild('dataView') dataView!: DataView;
  

  suggestionData: Suggestion[] = new Array(10).fill({
    suggestion: '',
    dateSuggested: new Date(),
    tags: [],
    recipient: ''
  });

  totalRecords: number = 0;
  loading: boolean = true;
  rowsPerPage = 10;
  sortField: string = 'dateSuggested';
  sortOrder: number = -1;
  errorMessage: string = '';
  dialogVisible: boolean = false;

  filterCriteria: Filter = {
    selectedSenders: [],
    selectedReceivers: [],
    selectedTags: [],
    reqAllTags: false,
    selectedStatus: [],
    selectedDate: [],
    searchText: '',
    importantOnly: false,
    newOnly: false
  }

  constructor(private suggestionService: SuggestionService) { }

  loadSuggestions($event: DataViewLazyLoadEvent, criteria: Filter = this.filterCriteria) {
    this.loading = true;

    this.suggestionService.getSuggestionData(criteria, $event.first ?? 0, $event.rows ?? 20).subscribe({
      next: (response: SuggestionResponse) => {
        this.suggestionData = response.suggestions;
        this.suggestionData.forEach((suggestion: Suggestion) => {
          suggestion.dateSuggested = new Date(suggestion.dateSuggested);
        });
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error;
        this.loading = false;
        this.dialogVisible = true;
      }
    });
  }

  onPageChange(event: any) {
    this.rowsPerPage = event.rows;
    this.loadSuggestions({ first: event.first, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder });
  }
  
  onFilterChange(filterCriteria: Filter) {
    this.filterCriteria = filterCriteria;
    this.dataView.first = 0;
    this.loadSuggestions({ first: 0, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, filterCriteria);
  }
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics", routerLink: "/email/dashboard2"},
    {label: "Email Suggestions"}
  ];

}
