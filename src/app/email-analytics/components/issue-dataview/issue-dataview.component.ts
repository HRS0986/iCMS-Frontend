import { Component } from '@angular/core';
import { Issue, IssueMetaDataResponse } from '../../interfaces/issues';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { MenuItem } from 'primeng/api';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issue-dataview',
  templateUrl: './issue-dataview.component.html',
  styleUrl: './issue-dataview.component.scss'
})
export class IssueDataviewComponent {
  
  issueData: Issue[] = new Array(10).fill({
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

  constructor(private issueService: IssueService) {}

  loadIssues($event: DataViewLazyLoadEvent) {
    this.loading = true;
    this.issueService.getIssueMetadata($event.first ?? 0, $event.rows ?? 20).subscribe({
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
    this.loadIssues({ first: event.first, rows:this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder});
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Issues"}
  ];

}
