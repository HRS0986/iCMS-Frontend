import { Component, ViewChild } from '@angular/core';
import { Inquiry, InquiryDataResponse } from '../../interfaces/inquiries';
import { InquiryService } from '../../services/inquiry.service';
import { DataViewLazyLoadEvent, DataView } from 'primeng/dataview';
import { MenuItem } from 'primeng/api';
import { Filter } from '../../interfaces/filters';

@Component({
  selector: 'app-inquiry-dataview',
  templateUrl: './inquiry-dataview.component.html',
  styleUrl: './inquiry-dataview.component.scss'
})
export class InquiryDataviewComponent {
  @ViewChild('dataView') dataView!: DataView;

  inquiryData: Inquiry[] = new Array(10).fill({
    id: '',
    inquiry: '',
    subject: '',
    status: 'new',
    client: '',
    company: '',
    dateOpened: new Date(),
    tags: [],
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

  constructor(private inquiryService: InquiryService) {}

  loadInquiries($event: DataViewLazyLoadEvent, criteria: Filter = this.filterCriteria) {
    this.loading = true;

    this.inquiryService.getInquiryData(criteria, $event.first ?? 0, $event.rows ?? 20).subscribe({
      next: (response: InquiryDataResponse) => {
        this.inquiryData = response.inquiries;
        this.inquiryData.forEach((inquiry: Inquiry) => {
          inquiry.dateOpened = new Date(inquiry.dateOpened);
          if (inquiry.dateUpdate) {
            inquiry.dateUpdate = new Date(inquiry.dateUpdate);
          }
          if (inquiry.dateClosed) {
            inquiry.dateClosed = new Date(inquiry.dateClosed);
          }
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
    this.loadInquiries({ first: event.first, rows:this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder});
  }

  onFilterChange(filterCriteria: Filter) {
    this.filterCriteria = filterCriteria;
    this.dataView.first = 0;
    this.loadInquiries({ first: 0, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder }, filterCriteria);
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics", routerLink: "/email/dashboard2"},
    {label: "Email Inquiries"}
  ];

}
