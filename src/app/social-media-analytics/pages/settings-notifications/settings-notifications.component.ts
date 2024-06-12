import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import UserMessages from "../../../shared/user-messages";
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { AlertType } from '../../models/settings';
import { SettingsApiService } from '../../services/settings-api.service';

@Component({
  selector: 'settings-notifications',
  templateUrl: './settings-notifications.component.html',
  styleUrls: ['./settings-notifications.component.scss']
})

export class SettingsNotificationsComponent implements OnInit {

  constructor(private settingsApiService: SettingsApiService, private fb: FormBuilder, private messageService: MessageService) { }

  socialMediaPlatforms: any[] | undefined;
  selectedPlatform: string | undefined;
  values: string[] | undefined;
  rangeValues: number[] = [20, 80];
  alertTypes: AlertType[] = [
    { name: 'Email Notification' },
    { name: 'App Notification' }
  ];
  notificationsSettingsFormSentiment = this.fb.group({
    platform: [''],
    bellowScore: [0],
    aboveScore: [0],
    aboveNotify: [false],
    bellowNotify: [false],
    alertType: ['']
  });
  notificationsSettingsFormKeywordAlert = this.fb.group({
    
  });
  notificationsSettingsFormChannelConfig = this.fb.group({
      
  }); 

  selectedAlertType: AlertType | undefined;

  ngOnInit() {
    let belowAlertsEnabled = this.notificationsSettingsFormKeywordAlert.get('bellowNotify')?.value;
    let aboveAlertsEnabled = this.notificationsSettingsFormKeywordAlert.get('aboveNotify')?.value;

    if (!belowAlertsEnabled) {
      this.notificationsSettingsFormKeywordAlert.get('bellowScore')?.disable();
    } else {
      this.notificationsSettingsFormKeywordAlert.get('bellowScore')?.enable();
    }

    if (!aboveAlertsEnabled) {
      this.notificationsSettingsFormKeywordAlert.get('aboveScore')?.disable();
    } else {
      this.notificationsSettingsFormKeywordAlert.get('aboveScore')?.enable();
    }

    this.socialMediaPlatforms = [
      { name: 'Instagram' },
      { name: 'Facebook' },
      { name: 'Twitter' }
    ];
  }

  onChangeBelowScore(event: CheckboxChangeEvent) {
    let belowAlertsEnabled = event.checked;
    if (belowAlertsEnabled) {
      this.notificationsSettingsFormKeywordAlert.get('bellowScore')?.enable();
    } else {
      this.notificationsSettingsFormKeywordAlert.get('bellowScore')?.disable();
    }
  }

  onChangeAboveScore(event: CheckboxChangeEvent) {
    let aboveAlertsEnabled = event.checked;
    if (aboveAlertsEnabled) {
      this.notificationsSettingsFormKeywordAlert.get('aboveScore')?.enable();
    } else {
      this.notificationsSettingsFormKeywordAlert.get('aboveScore')?.disable();
    }
  }

  onSubmitsentimentshigtcongif(): void {
    if (this.notificationsSettingsFormKeywordAlert.valid) {
      this.settingsApiService.setSentimentShift(this.notificationsSettingsFormKeywordAlert.value).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessages.SAVED_SUCCESS });
          console.log(response);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: UserMessages.SAVED_FAILURE });
          console.error(error);
        }
      );
    }
  }

  onSubmitKeywordConfig(): void {
    // Placeholder for additional submit logic
  }

  onSubmitChannelConfig(): void {
    // Placeholder for additional submit logic
  }
}
