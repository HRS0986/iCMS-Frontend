import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { CallSettingsService } from '../../services/call-settings.service';
import { CallSettingsDetails } from '../../types';
import UserMessages from '../../../shared/user-messages';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  notificationsSettingsForm = this.fb.group({
    keywords: [],
    emails: [],
    bellowScore: 0,
    aboveScore: 0,
    aboveNotify: false,
    bellowNotify: false,
    checked: [true],
  });
  callIntegrationSettingsForm = this.fb.group({
    dir: '',
  });
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private CallSettingsService: CallSettingsService
  ) {}

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
  }

  onChangeBelowScore(event: CheckboxChangeEvent) {
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
    const formValue = this.notificationsSettingsForm.value;

    const callSettingsDetails: CallSettingsDetails = {
      keywords: formValue.keywords || [],
      emails: formValue.emails || [],
      bellowScore: formValue.bellowScore || 0,
      aboveScore: formValue.aboveScore || 0,
      aboveNotify: formValue.aboveNotify || false,
      bellowNotify: formValue.bellowNotify || false,
      checked: formValue.checked || false,
    };

    this.CallSettingsService.updateNotificationSettings(callSettingsDetails)
      .then((response) => {
        if (response.status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: UserMessages.SAVED_SUCCESS,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.SAVED_ERROR,
          });
        }
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.SAVED_ERROR,
        });
        console.log(error);
      });
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Success',
    //   detail: UserMessages.SAVED_SUCCESS,
    // });
    console.log(this.notificationsSettingsForm.value);
  }

  onSubmitCall(): void {
    console.log(this.callIntegrationSettingsForm.value);
  }
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
