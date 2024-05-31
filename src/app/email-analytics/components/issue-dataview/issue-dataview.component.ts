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
  issueData: Issue[] = [
    {
      id: '1',
      issue: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isNew: true,
      isOverdue: true,
      isClosed: false,
      sender: 'Sender 1',
      recipient: 'Recipient 1',
      dateOpened: new Date(2024, 4, 30, 19, 25),
      tags: ['tag1', 'tag2'],
      effectivity: 3,
      efficiency: 4
    },
    {
      id: '2',
      issue: 'Issue 2',
      isNew: false,
      isOverdue: true,
      isClosed: false,
      sender: 'Sender 2',
      recipient: 'Recipient 2',
      dateOpened: new Date(2024, 4, 20, 14, 30),
      tags: ['tag3', 'tag4'],
      effectivity: 4,
      efficiency: 3
    },
    {
      id: '3',
      issue: 'Issue 3',
      isNew: false,
      isOverdue: false,
      isClosed: true,
      sender: 'Sender 3',
      recipient: 'Recipient 3',
      dateOpened: new Date(2024, 4, 30, 14, 30),
      dateClosed: new Date(2024, 4, 30, 14, 30),
      tags: ['tag5', 'tag6'],
      effectivity: 5,
      efficiency: 5
    }
  ];

  issueData_: Issue[] = new Array(10).fill({
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

  constructor(private issueService: IssueService) {}

  loadIssues($event: DataViewLazyLoadEvent) {
    this.loading = true;
    this.issueService.getIssueMetadata($event.first ?? 0, $event.rows ?? 20).subscribe(
      (response: IssueMetaDataResponse) => {
        this.issueData = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      }
    )
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
