import { Component, OnInit } from '@angular/core';



interface AlertType {
  name: string;
}

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

  selectedAlertType: AlertType | undefined;
  ngOnInit() {
    

    this.socialMediaPlatforms = [
      { name: 'Instagram' },
      { name: 'Facebook' },
      { name: 'Twitter' }
    ];
  }
}
