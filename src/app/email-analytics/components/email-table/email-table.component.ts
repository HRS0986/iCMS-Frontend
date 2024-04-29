import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { EmailMetadata, EmailMetadataResponse } from '../../interfaces/emails';
import { TableLazyLoadEvent } from 'primeng/table';
export interface EmailRow {
  subject: string;
  sender: string;
  receiver: string;
  date: string;
  time: string;
  sentiment:string;
  topics: string[];
};

@Component({
  selector: 'app-email-table',
  templateUrl: './email-table.component.html',
  styleUrl: './email-table.component.scss'
})


export class EmailTableComponent implements OnInit {
  rows: EmailMetadata[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(private emailService: EmailService){}

  ngOnInit() {
    this.loadEmails({first: 0, rows: 10});
  }

  loadEmails($event: TableLazyLoadEvent) {
    this.loading = true;
    this.emailService.getEmailMetadata($event.first ?? 0, 10).subscribe(
      (response: EmailMetadataResponse) => {
        this.rows = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      }
    )
  }

  getSeverity(sentiment: string): string {
    if (sentiment === 'Positive') {
      return 'success';
    } else if (sentiment === 'Negative') {
      return 'danger';
    } else {
      return 'info';
    }
  }
}
