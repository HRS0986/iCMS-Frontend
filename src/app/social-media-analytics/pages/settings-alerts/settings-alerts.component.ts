import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Content, item } from '../../structs';


const itemService: item[] = [
  {
    id: '1000',
    keyword: 'Vega, Lia',
    alerttype: 'Email',
    threshold: '450 - 725',
    min: 35,
    max: 45
  },
  {
    id: '1001',
    keyword: 'CodeGen',
    alerttype: 'App',
    threshold: 'More Than 800',
    min: 55,
    max: 100
  },
  {
    id: '1002',
    keyword: 'TravelBox',
    alerttype: 'App',
    threshold: 'Less Than 1100',
    min: 0,
    max: 50
  }
];


@Component({
  selector: 'settings-alerts',
  templateUrl: './settings-alerts.component.html',
  styleUrls: ['./settings-alerts.component.scss']
})
export class SettingsAlerts implements OnInit {
  items!: item[];
  selecteditem!: item;

  ngOnInit() {
    this.items = itemService;
  }

  onRowEdit(item: item) {
  }

  onRowDelete(item: item) {
  }

  tabFacebook = {title:'Facebook', img: 'assets/social-media/icons/facebook.png'};
  tabInstergram = {title:'Instergram', img: 'assets/social-media/icons/instargram.png'};
  tabTwitter = {title:'Twitter', img: 'assets/social-media/icons/twitter.png'};

  content1: Content = {title: 'Created Alerts', subtitle: '15 Custom Alerts'};
  content2: Content = {title: 'Instergram Content'};
  content3: Content = {title: 'Twitter Content'};
}