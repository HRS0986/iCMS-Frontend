import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  notifications = this.fb.group({
    keywords: [],
    emails: [],
    bellowScore: 0,
    aboveScore: 0,
    aboveNotify: false,
    bellowNotify: false,
    checked: true,
  });

  callIntegration = this.fb.group({
    dir: '',
    autoDeleteStatus: false,
    deleteAfter: 5,
  });
  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.notifications.value);
  }

  onSubmitCall(): void {
    console.log(this.callIntegration.value);
  }
  // Keywords: any[] = [];
  // emails: any[] = [];
  // dir: string = '';
  // checked: boolean = true;
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
