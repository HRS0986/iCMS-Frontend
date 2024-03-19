import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content } from '../../structs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class settingsComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Settings"}
  ];

  tabNotifications = {title:'Notifications', img: ''};
  tabThresholds = {title:'Thresholds', img: ''};
  tabAlerts = {title:'Alerts', img: ''};
  tabCampaigns = {title:'Campaigns', img: ''};

  content1: Content = {title: 'Notifications'};
  content2: Content = {title: 'Thresholds'};
  content3: Content = {title: 'Alerts'};
  content4: Content = {title: 'Campaigns'};
}