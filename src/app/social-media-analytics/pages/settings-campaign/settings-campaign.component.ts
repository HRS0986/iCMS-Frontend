import { Component } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Content, item } from '../../structs';


const itemService: item[] = [
  {
    id: '1000',
    keyword: 'Vega EVX Electric Super Car Headed To Geneva With 804..',
    alerttype: 'VEGA',
    threshold: '92%',
    min: 0,
    max: 100
  },
  {
    id: '1001',
    keyword: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your..',
    alerttype: 'Codegen',
    threshold: 'More Than 800',
    min: 0,
    max: 100
  },
  {
    id: '1002',
    keyword: 'TravelBox™ Intro Video - Proven Travel Software For...',
    alerttype: 'Codegen',
    threshold: 'Less Than 1100',
    min: 0,
    max: 100
  }
];


@Component({
  selector: 'settings-campaign',
  templateUrl: './settings-campaign.component.html',
  styleUrl: './settings-campaign.component.scss'
})
export class SettingsCampaignComponent {
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
  tabInstergram = {title:'Instagram', img: 'assets/social-media/icons/instargram.png'};
  tabTwitter = {title:'Twitter', img: 'assets/social-media/icons/twitter.png'};

  content1: Content = {title: 'Created Campaigns', subtitle: '15 Custom Alerts'};
  content2: Content = {title: 'Instagram Content'};
  content3: Content = {title: 'Twitter Content'};

  topBarCaption = "Add New";

}
