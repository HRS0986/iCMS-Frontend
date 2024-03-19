import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrl: './view-thread.component.scss'
})
export class ViewThreadComponent {
  @Input() threadEmails!: string[];
  @Input() threadId!: string;
}
