import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Content, campaign} from '../../structs';


const campaignService: campaign[] = [
  {
    id: '1000',
    title: 'Vega EVX Electric Super Car Headed To Geneva With 804..',
    company: 'VEGA',
    overall_sentiment: '92',
    color: 'green',
    min: 0,
    max: 100
  },
  {
    id: '1001',
    title: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your..',
    company: 'Codegen',
    overall_sentiment: 'More Than 800',
    min: 0,
    max: 100
  },
  {
    id: '1002',
    title: 'TravelBox™ Intro Video - Proven Travel Software For...',
    company: 'Codegen',
    overall_sentiment: 'Less Than 1100',
    min: 0,
    max: 100
  }
];


@Component({
  selector: 'settings-campaign',
  templateUrl: './settings-campaign.component.html',
  styleUrl: './settings-campaign.component.scss'
})
export class SettingsCampaignComponent implements OnInit{
  campaigns!: campaign[];
  selectedcampaign!: campaign;

  ngOnInit() {
    this.campaigns = campaignService;
  }

  onRowEdit(campaign: campaign) {
  }

  onRowDelete(campaign: campaign) {
  }

  tabFacebook = {title:'Facebook', img: 'assets/social-media/icons/facebook.png'};
  tabInstergram = {title:'Instagram', img: 'assets/social-media/icons/instargram.png'};
  tabTwitter = {title:'Twitter', img: 'assets/social-media/icons/twitter.png'};

  content1: Content = {title: 'Created Campaigns', subtitle: '15 Custom Alerts'};
  content2: Content = {title: 'Instagram Content'};
  content3: Content = {title: 'Twitter Content'};

  topBarCaption = "Add New";

}
