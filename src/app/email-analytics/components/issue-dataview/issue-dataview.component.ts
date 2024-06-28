import { Component, ViewChild } from '@angular/core';
import { Issue, IssueDataResponse } from '../../interfaces/issues';
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
    subject: '',
    status: 'new',
    client: '',
    company: '',
    dateOpened: new Date(),
    tags: []
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

    this.issueService.getIssueData(criteria, $event.first ?? 0, $event.rows ?? 10).subscribe({
      next: (response: IssueDataResponse) => {
        this.issueData = response.issues;
        this.issueData.forEach((issue: Issue) => {
          issue.dateOpened = new Date(issue.dateOpened);
          if (issue.dateUpdate) {
            issue.dateUpdate = new Date(issue.dateUpdate);
          }
          if (issue.dateClosed) {
            issue.dateClosed = new Date(issue.dateClosed);
          }
        });
        // console.log(response);
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
    this.loadIssues({ first: event.first, rows:this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, this.filterCriteria);
  }

  onFilterChange(filterCriteria: Filter) {
    this.filterCriteria = filterCriteria;
    this.dataView.first = 0;
    this.loadIssues({ first: 0, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, filterCriteria);
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics", routerLink: "/email/dashboard2"},
    {label: "Email Issues"}
  ];
}
