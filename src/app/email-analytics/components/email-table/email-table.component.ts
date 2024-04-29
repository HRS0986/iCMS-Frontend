import { Component, Input } from '@angular/core';

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
  @Input() rows!: EmailRow[];
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
