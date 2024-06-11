import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import UserMessages from "../../../shared/user-messages";
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'settings-notifications',
  templateUrl: './settings-notifications.component.html',
  styleUrls: ['./settings-notifications.component.scss']
})

export class SettingsNotificationsComponent implements OnInit {

  socialMediaPlatforms: any[] | undefined;
  selectedPlatform: string | undefined;
  values: string[] | undefined;
  rangeValues: number[] = [20, 80];
  alertTypes: AlertType[] = [
    { name: 'Email Notification' },
    { name: 'App Notification' }
  ];
  notificationsSettingsForm = this.fb.group({
    keywords: [],
    emails: [],
    bellowScore: 0,
    aboveScore: 0,
    aboveNotify: false,
    bellowNotify: false,
    checked: [true],
  });
  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  selectedAlertType: AlertType | undefined;
  ngOnInit() {
    let belowAlertsEnabled =
      this.notificationsSettingsForm.get('bellowNotify')?.value;
    let aboveAlertsEnabled =
      this.notificationsSettingsForm.get('aboveNotify')?.value;

    if (!belowAlertsEnabled) {
      this.notificationsSettingsForm.get('bellowScore')?.disable();
    } else {
      this.notificationsSettingsForm.get('bellowScore')?.enable();
    }

    if (!aboveAlertsEnabled) {
      this.notificationsSettingsForm.get('aboveScore')?.disable();
    } else {
      this.notificationsSettingsForm.get('aboveScore')?.enable();
    }

    this.socialMediaPlatforms = [
      { name: 'Instagram' },
      { name: 'Facebook' },
      { name: 'Twitter' }
    ];
  }

  onChangeBelowScore(event: CheckboxChangeEvent) {
    console.log(event.checked); 
    let belowAlertsEnabled = event.checked.length !== 0;
    if (belowAlertsEnabled) {
      this.notificationsSettingsForm.get('bellowScore')?.enable();
    } else {
      this.notificationsSettingsForm.get('bellowScore')?.disable();
    }
  }
  
  onChangeAboveScore(event: CheckboxChangeEvent) {
    let aboveAlertsEnabled = event.checked.length !== 0;
    if (aboveAlertsEnabled) {
      this.notificationsSettingsForm.get('aboveScore')?.enable();
    } else {
      this.notificationsSettingsForm.get('aboveScore')?.disable();
    }
  }
  onSubmit(): void {
    console.log(this.notificationsSettingsForm.value);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessages.SAVED_SUCCESS })
    console.log(this.notificationsSettingsForm.value);
  }
}


