import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { CallSettingsService } from '../../services/call-settings.service';
import { CallSettingsDetails } from '../../types';
import UserMessages from '../../../shared/user-messages';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  notificationsSettingsForm: FormGroup;
  callSettingsDetails!: CallSettingsDetails;

  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics', routerLink: '/call/dashboard' },
    { label: 'Settings' },
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private callSettingsService: CallSettingsService
  ) {
    this.notificationsSettingsForm = this.fb.group({
      keywords: new FormControl<any>([]),
      emails: new FormControl([]),
      topics: new FormControl([]),
      bellowScore: new FormControl(0),
      aboveScore: new FormControl(0),
      aboveNotify: new FormControl(false),
      bellowNotify: new FormControl(false),
      enableEmailNotification: new FormControl(false),
      enableKeywordsNotification: new FormControl(true),
      enablePushNotification: new FormControl(true),
    });
  }

  ngOnInit() {
    this.callSettingsService.getNotificationSettings().subscribe(
      (result) => {
        if (result.status) {
          this.callSettingsDetails = result.data;
          this.notificationsSettingsForm.setValue({
            keywords: this.callSettingsDetails['alert_keywords'],
            emails: this.callSettingsDetails['alert_email_receptions'],
            topics: this.callSettingsDetails['topics'],
            bellowScore: this.callSettingsDetails['sentiment_lower_threshold'],
            aboveScore: this.callSettingsDetails['sentiment_upper_threshold'],
            aboveNotify: this.callSettingsDetails['is_upper_threshold_enabled'],
            bellowNotify:
              this.callSettingsDetails['is_lower_threshold_enabled'],
            enableEmailNotification:
              this.callSettingsDetails['is_email_alerts_enabled'],
            enableKeywordsNotification:
              this.callSettingsDetails['is_keyword_alerts_enabled'],
            enablePushNotification:
              this.callSettingsDetails['is_push_notifications_enabled'],
          });
          const belowAlertsEnabled =
            this.notificationsSettingsForm.get('bellowNotify')?.value;
          const aboveAlertsEnabled =
            this.notificationsSettingsForm.get('aboveNotify')?.value;
          const isEmailNotificationEnabled = this.notificationsSettingsForm.get(
            'enableEmailNotification'
          )?.value;
          const isKeywordNotificationsAllowed =
            this.notificationsSettingsForm.get(
              'enableKeywordsNotification'
            )?.value;

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

          if (!isEmailNotificationEnabled) {
            this.notificationsSettingsForm.get('emails')?.disable();
          } else {
            this.notificationsSettingsForm.get('emails')?.enable();
          }

          if (!isKeywordNotificationsAllowed) {
            this.notificationsSettingsForm.get('keywords')?.disable();
          } else {
            this.notificationsSettingsForm.get('keywords')?.enable();
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.FETCH_ERROR,
          });
        }
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.FETCH_ERROR,
        });
      }
    );
  }

  onChangeBelowScore(event: CheckboxChangeEvent) {
    console.log('Below Score Checkbox Changed:', event.checked);
    const belowAlertsEnabled = event.checked;
    if (belowAlertsEnabled) {
      this.notificationsSettingsForm.get('bellowScore')?.enable();
    } else {
      this.notificationsSettingsForm.get('bellowScore')?.disable();
    }
  }

  onChangeAboveScore(event: CheckboxChangeEvent) {
    console.log('Above Score Checkbox Changed:', event.checked);
    const aboveAlertsEnabled = event.checked;
    if (aboveAlertsEnabled) {
      this.notificationsSettingsForm.get('aboveScore')?.enable();
    } else {
      this.notificationsSettingsForm.get('aboveScore')?.disable();
    }
  }

  onSubmit(): void {
    const formValue = this.notificationsSettingsForm.value;
    (this.callSettingsDetails.alert_keywords =
      formValue.keywords === undefined ? [] : formValue.keywords),
      (this.callSettingsDetails.alert_email_receptions = formValue.emails),
      (this.callSettingsDetails.sentiment_lower_threshold =
        formValue.bellowScore || 0),
      (this.callSettingsDetails.sentiment_upper_threshold =
        formValue.aboveScore || 10),
      (this.callSettingsDetails.is_upper_threshold_enabled =
        formValue.aboveNotify),
      (this.callSettingsDetails.is_lower_threshold_enabled =
        formValue.bellowNotify),
      (this.callSettingsDetails.is_email_alerts_enabled =
        formValue.enableEmailNotification),
      (this.callSettingsDetails.is_push_notifications_enabled =
        formValue.enablePushNotification),
      (this.callSettingsDetails.is_keyword_alerts_enabled =
        formValue.enableKeywordsNotification),
      (this.callSettingsDetails.topics = formValue.topics);
    console.log(this.callSettingsDetails);
    this.callSettingsService
      .updateNotificationSettings(this.callSettingsDetails)
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
}
