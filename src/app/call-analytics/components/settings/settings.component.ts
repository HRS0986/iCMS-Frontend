import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { CallSettingsService } from '../../services/call-settings.service';
import { CallDirSettingsDetails, CallSettingsDetails } from '../../types';
import UserMessages from '../../../shared/user-messages';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  notificationsSettingsForm: FormGroup;
  notification: CallSettingsDetails[] = [];
  callIntegrationSettingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private callSettingsService: CallSettingsService
  ) {
    this.notificationsSettingsForm = this.fb.group({
      keywords: [[]],
      emails: [[]],
      bellowScore: [0],
      aboveScore: [0],
      aboveNotify: [false],
      bellowNotify: [false],
      checked: [true],
    });

    this.callIntegrationSettingsForm = this.fb.group({
      dir: [''],
    });
  }

  ngOnInit() {
    this.reloadDataSource();
    const belowAlertsEnabled =
      this.notificationsSettingsForm.get('bellowNotify')?.value;
    const aboveAlertsEnabled =
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

  reloadDataSource() {
    this.callSettingsService.getNotificationSettings('1').subscribe(
      (result) => {
        if (result.status) {
          this.notification = result.data;
          console.log(this.notification);
          this.notificationsSettingsForm.setValue({
            keywords: this.notification[0]['alert_keywords'] || [],
            emails: this.notification[0]['alert_email_receptions'] || [],
            bellowScore: this.notification[0]['sentiment_lower_threshold'] || 0,
            aboveScore: this.notification[0]['sentiment_upper_threshold'] || 0,
            aboveNotify: [
              this.notification[0]['is_upper_threshold_enabled'],
            ] || [false],
            bellowNotify: [
              this.notification[0]['is_lower_threshold_enabled'],
            ] || [false],
            checked: this.notification[0]['is_email_alerts_enabled'] || [false],
          });
          console.log(this.notificationsSettingsForm.value);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.FETCH_ERROR,
            life: 5000,
          });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.FETCH_ERROR,
          life: 5000,
        });
      }
    );
  }

  onChangeBelowScore(event: CheckboxChangeEvent) {
    const belowAlertsEnabled = event.checked.length !== 0;
    if (belowAlertsEnabled) {
      this.notificationsSettingsForm.get('bellowScore')?.enable();
    } else {
      this.notificationsSettingsForm.get('bellowScore')?.disable();
    }
  }

  onChangeAboveScore(event: CheckboxChangeEvent) {
    const aboveAlertsEnabled = event.checked.length !== 0;
    if (aboveAlertsEnabled) {
      this.notificationsSettingsForm.get('aboveScore')?.enable();
    } else {
      this.notificationsSettingsForm.get('aboveScore')?.disable();
    }
  }

  onSubmit(): void {
    const formValue = this.notificationsSettingsForm.value;
    console.log(Array.isArray(formValue.aboveNotify) ? true : false);
    const callSettingsDetails: CallSettingsDetails = {
      id: '',
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
    this.callSettingsService
      .updateNotificationSettings(callSettingsDetails)
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
      id: '',
      user_id: '1',
      dir: dir,
    };

    this.callSettingsService
      .updateDirSettings(settings)
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
