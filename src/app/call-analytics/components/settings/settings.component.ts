import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import UserMessages from "../../../shared/user-messages";

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
    checked: [true],
  });

  callIntegration = this.fb.group({
    dir: '',
    autoDeleteStatus: false,
    deleteAfter: 5,
  });
  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  onSubmit(): void {
    console.log(this.notifications.value);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessages.SAVED_SUCCESS })
  }

  onSubmitCall(): void {
    console.log(this.callIntegration.value);
  }
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
