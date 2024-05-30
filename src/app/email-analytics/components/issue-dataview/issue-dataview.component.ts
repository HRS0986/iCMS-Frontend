import { Component } from '@angular/core';
import { Issue } from '../../interfaces/issues';

@Component({
  selector: 'app-issue-dataview',
  templateUrl: './issue-dataview.component.html',
  styleUrl: './issue-dataview.component.scss'
})
export class IssueDataviewComponent {
  issueData: Issue[] = [
    {
      issue: 'Issue 1',
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
}
