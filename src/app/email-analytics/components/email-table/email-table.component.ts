import { Component } from '@angular/core';
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


export class EmailTableComponent {
  // array of empty objects to trigger loading skeleton
  emailMetaData: EmailMetadata[] = new Array(10).fill({
    subject: '',
    sender: '',
    receiver: '',
    date: '',
    time: '',
    sentiment: '',
    topics: []
  });

  totalRecords: number = 0;
  loading: boolean = true;
  rowsPerPage: number = 10;

  constructor(private emailService: EmailService){}

  loadEmails($event: TableLazyLoadEvent) {
    this.loading = true;
    this.emailService.getEmailMetadata($event.first ?? 0, $event.rows ?? 20).subscribe(
      (response: EmailMetadataResponse) => {
        this.emailMetaData = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      }
    )
  }
  onPageChange(event: any) {
    this.rowsPerPage = event.rows;
    this.loadEmails({ first: event.first, rows:this.rowsPerPage });
  }

  getSeverity(sentiment: string): "success" | "info" | "danger" {
    if (sentiment === 'Positive') {
      return 'success';
    } else if (sentiment === 'Negative') {
      return 'danger';
    } else {
      return 'info';
    }
  }
}
