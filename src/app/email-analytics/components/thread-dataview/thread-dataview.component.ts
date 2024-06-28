import { Component, ViewChild } from '@angular/core';
import { Thread, ThreadResponse } from '../../interfaces/threads';
import { Filter } from '../../interfaces/filters';
import { ThreadService } from '../../services/thread.service';
import { DataViewLazyLoadEvent, DataView } from 'primeng/dataview';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-thread-dataview',
  templateUrl: './thread-dataview.component.html',
  styleUrl: './thread-dataview.component.scss'
})
export class ThreadDataviewComponent {
  @ViewChild('dataView') dataView!: DataView;

  threadData: Thread[] = new Array(10).fill({
    subject: '',
    type: 'hot',
    snippet: '',
    summary: '',
    lastUpdate: new Date(),
    tags: []
  });

  totalRecords: number = 0;
  loading: boolean = true;
  rowsPerPage: number = 10;
  // default sort field and order - latest issues first
  sortField: string = 'lastUpdate';
  sortOrder: number = -1;
  errorMessage: string = '';
  dialogVisible: boolean = false;
  hotThreads: boolean = true;

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

  constructor(private threadService: ThreadService) {}

  loadThreads($event: DataViewLazyLoadEvent, criteria: Filter = this.filterCriteria) {
    this.loading = true;
    if (this.hotThreads) {
      this.threadService.getHotThreads(criteria, $event.first ?? 0, $event.rows ?? 10).subscribe({
        next: (response: ThreadResponse) => {
          this.threadData = response.threads;
          this.threadData.forEach((thread: Thread) => {
            thread.lastUpdate = new Date(thread.lastUpdate);
          });
          this.totalRecords = response.total;
          this.loading = false;
          console.log(this.threadData);
        },
        error: (error: any) => {
          this.errorMessage = error;
          this.loading = false;
          this.dialogVisible = true;
        }
      });
    } else {
      this.threadService.getAllThreads(criteria, $event.first ?? 0, $event.rows ?? 10).subscribe({
        next: (response: ThreadResponse) => {
          this.threadData = response.threads;
          this.threadData.forEach((thread: Thread) => {
            thread.lastUpdate = new Date(thread.lastUpdate);
          });
          this.totalRecords = response.total;
          this.loading = false;
          console.log(this.threadData);
        },
        error: (error: any) => {
          this.errorMessage = error;
          this.loading = false;
          this.dialogVisible = true;
        }
      });
    }
  }
  onPageChange(event: any) {
    this.rowsPerPage = event.rows;
    this.loadThreads({ first: event.first, rows:this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, this.filterCriteria);
  }

  onFilterChange(filterCriteria: Filter) {
    this.filterCriteria = filterCriteria;
    this.dataView.first = 0;
    this.loadThreads({ first: 0, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, filterCriteria);
  }

  onHotThreadsChange($event: any) {
    // BUG: check this thoroughly
    this.dataView.first = 0;
    this.loadThreads({ first: 0, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, this.filterCriteria);
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics", routerLink: "/email/dashboard2"},
    {label: "Thread Summaries"}
  ];
}
