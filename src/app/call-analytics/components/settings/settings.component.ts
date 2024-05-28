import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { CallSettingsService } from '../../services/call-settings.service';
import { CallDirSettingsDetails, CallSettingsDetails } from '../../types';
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
    const formValue = this.notificationsSettingsForm.value;
    // console.log(formValue.aboveNotify == true ? true : false);
    console.log(Array.isArray(formValue.aboveNotify) ? true : false);
    const callSettingsDetails: CallSettingsDetails = {
      id: '6655e8e7ee448447a31e4899',
      user_id: '1',
      alert_keywords: formValue.keywords || [],
      alert_email_receptions: formValue.emails || [],
      sentiment_lower_threshold: formValue.bellowScore || 0,
      sentiment_upper_threshold: formValue.aboveScore || 0,
      is_upper_threshold_enabled: Array.isArray(formValue.aboveNotify)
        ? true
        : false || false,
      is_lower_threshold_enabled: Array.isArray(formValue.bellowNotify)
        ? true
        : false || false,
      is_email_alerts_enabled: formValue.checked || false,
    };
    console.log(callSettingsDetails);
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
  }

  onSubmitCall(): void {
    const dir = this.callIntegrationSettingsForm.value.dir || '';
    const settings: CallDirSettingsDetails = {
      id: '6655e8e7ee448447a31e4899',
      dir: dir,
    };

    this.CallSettingsService.updateDirSettings(settings)
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
    console.log(this.callIntegrationSettingsForm.value);
  }
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
