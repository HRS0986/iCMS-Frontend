import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content } from '../../models/main-types';
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

  content1: Content = {title: 'Notification Configuration'};
  content2: Content = {title: 'Created Thresholds'};
  content3: Content = {title: 'Created Alerts'};
  content4: Content = {title: 'Created Campaigns'};

  topBarCaption = "Export Data";
 
}