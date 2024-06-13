import { Component, ViewChild } from '@angular/core';
import { Issue, IssueMetaDataResponse } from '../../interfaces/issues';
import { DataViewLazyLoadEvent, DataView } from 'primeng/dataview';
import { MenuItem } from 'primeng/api';
import { IssueService } from '../../services/issue.service';
import { Filter } from '../../interfaces/filters';

@Component({
  selector: 'app-issue-dataview',
  templateUrl: './issue-dataview.component.html',
  styleUrl: './issue-dataview.component.scss'
})
export class IssueDataviewComponent {

  @ViewChild('dataView') dataView!: DataView;

  issueData: Issue[] = new Array(10).fill({
    id: '',
    issue: '',
    isNew: false,
    isOverdue: false,
    isClosed: false,
    sender: '',
    recipient: '',
    dateOpened: new Date(),
    tags: [],
    effectivity: 0,
    efficiency: 0
  });

  totalRecords: number = 0;
  loading: boolean = true;
  rowsPerPage: number = 10;
  // default sort field and order - latest issues first
  sortField: string = 'dateOpened';
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

  constructor(private issueService: IssueService) {}

  loadIssues($event: DataViewLazyLoadEvent, criteria: Filter = this.filterCriteria) {
    this.loading = true;
    
    this.issueService.getMockIssueData(criteria, $event.first ?? 0, $event.rows ?? 10).subscribe({
      next: (response: IssueMetaDataResponse) => {
        this.issueData = response.data;
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
    this.loadIssues({ first: event.first, rows:this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder}, this.filterCriteria);
  }

  onFilterChange(filterCriteria: Filter) {
    this.filterCriteria = filterCriteria;
    this.dataView.first = 0;
    this.loadIssues({ first: 0, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, filterCriteria);
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Issues"}
  ];
}
