import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content } from '../../models/main-types';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss']
})
export class CAComponent {

  breadcrumbItems: MenuItem[] = [
    { label: "Social Media Analytics" },
    { label: "Campaign Analysis" }
  ];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instergram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  caPageItem1: Content = { title: 'Top Performing Campaigns on Facebook' };
  caPageItem2: Content = { title: 'Top Performing Campaigns on Instergram' };
  caPageItem3: Content = { title: 'Top Performing Campaigns on Twitter' };

  topBarCaption = "Custom Campaigns";

  showAdditionalCards: boolean = false;

  topCampaigns: any[] = [
    {
      name: 'Vega EVX Electric Super Car',
      campaignName: 'VEGA Innovation',
      sentiment: 80,
      progress: 80,
      color: '#23B103',
      likesCount: 643,
      likesChange: +53,
      commentsCount: 123,
      commentsChange: +12,
      dataSentimentLabels: [1,2,3,4],
      dataSentimentValues: [1,2,3,4],
      imageUrl: 'https://th.bing.com/th/id/OIP.Eak-XmLRk42PkzvDtgT2QwHaEu?w=350&h=183&c=7&r=0&o=5&pid=1.7'
    },
    {
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 30,
      progress: 30,
      color: '#EF6327',
      likesCount: 123,
      likesChange: -12,
      commentsCount: 53,
      commentsChange: -5,
      dataSentimentLabels: ["qw", "er", "ty", "ui"],
      dataSentimentValues: [1,2,3,4],
      imageUrl: 'https://th.bing.com/th/id/OIP.CHSYo7LrEZdfmUUvGkyPigHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 90,
      progress: 90,
      color: '#0BB783',
      likesCount: 543,
      likesChange: +23,
      commentsCount: 223,
      commentsChange: +32,
      dataSentimentLabels: [1,2,3,4],
      dataSentimentValues: [1,2,3,4],
      imageUrl: 'https://th.bing.com/th/id/OIP.gIC1WV1MozLQa0sZzSxGtgAAAA?w=222&h=178&c=7&r=0&o=5&pid=1.7'
    },
  ];

  additionalCampaigns1: any[] = [
    {
      name: 'Vega EVX Electric Super Car Headed To Geneva With 804 HP',
      campaignName: 'VEGA Innovation',
      sentiment: 75,
      progress: 50,
      color: '#93B103',
      imageUrl: 'https://th.bing.com/th/id/OIP.Eak-XmLRk42PkzvDtgT2QwHaEu?w=350&h=183&c=7&r=0&o=5&pid=1.7'
    },
    {
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      color: '#23B103',
      imageUrl: 'https://th.bing.com/th/id/OIP.CHSYo7LrEZdfmUUvGkyPigHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      color: '#23B103',
      imageUrl: 'https://th.bing.com/th/id/OIP.gIC1WV1MozLQa0sZzSxGtgAAAA?w=222&h=178&c=7&r=0&o=5&pid=1.7'
    },
  ];

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  toggleAdditionalCards(): void {
    this.showAdditionalCards = !this.showAdditionalCards;
  }

  selectPlatform(platform: string) {
    console.log('Selected platform:', platform);
  }

}
