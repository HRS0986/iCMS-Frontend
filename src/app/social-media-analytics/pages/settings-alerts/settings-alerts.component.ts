import { Component, OnInit } from '@angular/core';
import { SettingAlertsData, AlertItem } from '../../models/settings';
import { SettingsApiService } from '../../services/settings-api.service';

@Component({
  selector: 'settings-alerts',
  templateUrl: './settings-alerts.component.html',
  styleUrls: ['./settings-alerts.component.scss']
})

export class SettingsAlerts implements OnInit {
  list_alerts: AlertItem[] = [];

  constructor(private settingsApiService: SettingsApiService) { }

  ngOnInit() {
    this.settingsApiService.getTopicAlerts().subscribe(
      (response: AlertItem[]) => {
        this.list_alerts = response;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onRowEdit(item: AlertItem) {
    // Implement edit functionality
  }

  onRowDelete(item: AlertItem) {
    // Implement delete functionality
  }

  topBarCaption = "Add New";
}
