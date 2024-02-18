import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
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
  constructor(private fb: FormBuilder) {}

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
  }

  onSubmitCall(): void {
    console.log(this.callIntegrationSettingsForm.value);
  }
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
