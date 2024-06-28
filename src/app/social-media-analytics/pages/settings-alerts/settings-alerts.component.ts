import { Component, OnInit } from '@angular/core';
import { SettingAlertsData, AlertItem } from '../../models/settings';
import { SettingsApiService } from '../../services/settings-api.service';

@Component({
  selector: 'settings-alerts',
  templateUrl: './settings-alerts.component.html',
  styleUrls: ['./settings-alerts.component.scss']
})

export class SettingsAlerts implements OnInit {
  list_facebook: AlertItem[] = [];
  list_instagram: AlertItem[] = [];
  list_twitter: AlertItem[] = [];

  constructor(private settingsApiService: SettingsApiService) { }

  ngOnInit() {
    this.settingsApiService.getTopicAlerts().subscribe(
      (response: AlertItem[]) => {
        // Clear the lists before populating
        this.list_facebook = [];
        this.list_instagram = [];
        this.list_twitter = [];

        // Divide the response into Facebook, Instagram, and Twitter
        response.forEach(alert => {
          switch (alert.sm_id) {
            case "SM01":
              this.list_facebook.push(alert);
              break;
            case "SM02":
              this.list_instagram.push(alert);
              break;
            case "SM03":
              this.list_twitter.push(alert);
              break;
            default:
              console.warn(`Invalid sm_id: ${alert.sm_id}`);
          }
        });

        // Update content data
        this.contentFacebook.data = this.list_facebook;
        this.contentInstergram.data = this.list_instagram;
        this.contentTwitter.data = this.list_twitter;
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

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instagram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  contentFacebook: SettingAlertsData = { subtitle: "Facebook", data: this.list_facebook };
  contentInstergram: SettingAlertsData = { subtitle: "Instergram", data: this.list_instagram };
  contentTwitter: SettingAlertsData = { subtitle: "Twitter", data: this.list_twitter };

  topBarCaption = "Add New";
}
