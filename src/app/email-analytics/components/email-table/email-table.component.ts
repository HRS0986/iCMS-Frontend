import { Component, Input } from '@angular/core';

export interface EmailRow {
  subject: String;
  sender: String;
  receiver: String;
  date: String;
  sentiment: String;
  topics: String;
};

@Component({
  selector: 'app-email-table',
  templateUrl: './email-table.component.html',
  styleUrl: './email-table.component.scss'
})


export class EmailTableComponent {
  @Input() rows!: EmailRow[];
}
