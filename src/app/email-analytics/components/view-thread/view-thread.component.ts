import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from '../../services/summary.service';
import { EmailThread } from '../../interfaces/summary';

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrl: './view-thread.component.scss'
})
export class ViewThreadComponent implements OnInit {
  constructor(private summaryService: SummaryService) { }

  emailThread: EmailThread = { id: '', subject: '', emails: [] };

  ngOnInit(): void {
    this.summaryService.getThread(this.threadId).subscribe((response) => this.emailThread = response);
  }

  @Input() threadId!: string;
}
