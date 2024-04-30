import { Component, OnInit } from '@angular/core';
import { SettingAlertsData, AlertItem } from '../../structs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'settings-alerts',
  templateUrl: './settings-alerts.component.html',
  styleUrls: ['./settings-alerts.component.scss']
})

export class SettingsAlerts implements OnInit {
  list_facebook: AlertItem[] = [];
  list_instagram: AlertItem[] = [];
  list_twitter: AlertItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://127.0.0.1:8000/social-media/keyword_alerts')
      .subscribe(response => {
        const alerts = response[0] as AlertItem[];
        alerts.forEach(alert => {
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
              console.log("Invalid sm_id:", alert.sm_id);
          }
        });
      },
        error => {
          console.error('Error fetching data:', error);
        });
  }

  onRowEdit(item: AlertItem) {
  }

  onRowDelete(item: AlertItem) {
  }

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instergram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  contentFacebook: SettingAlertsData = { subtitle: "Facebook", data: this.list_facebook };
  contentInstergram: SettingAlertsData = { subtitle: "Instergram", data: this.list_instagram };
  contentTwitter: SettingAlertsData = { subtitle: "Twitter", data: this.list_twitter };

  topBarCaption = "Add New";
}