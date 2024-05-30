import { Component } from '@angular/core';
import { Issue } from '../../interfaces/issues';
import { getLocaleEraNames } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-issue-dataview',
  templateUrl: './issue-dataview.component.html',
  styleUrl: './issue-dataview.component.scss'
})
export class IssueDataviewComponent {
  issueData: Issue[] = [
    {
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

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Issues"}
  ];

}
