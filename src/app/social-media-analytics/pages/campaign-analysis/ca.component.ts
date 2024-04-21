import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content } from '../../structs';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss']
})
export class CAComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Campaign Analysis"}
  ];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instergram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  caPageItem1: Content = {title: 'Facebook Content'};
  caPageItem2: Content = {title: 'Instergram Content'};
  caPageItem3: Content = {title: 'Twitter Content'};

  topBarCaption = "Custom Campaigns";

  showAdditionalCards: boolean = false;

  topCampaigns: any[] = [
    { 
      name: 'Vega EVX Electric Super Car Headed To Geneva With 804 HP',
      campaignName: 'VEGA Innovation',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.Eak-XmLRk42PkzvDtgT2QwHaEu?w=350&h=183&c=7&r=0&o=5&pid=1.7'
    },
    { 
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.CHSYo7LrEZdfmUUvGkyPigHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7' 
    },
    { 
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.gIC1WV1MozLQa0sZzSxGtgAAAA?w=222&h=178&c=7&r=0&o=5&pid=1.7' 
    },
  ];

  additionalCampaigns1: any[] = [
    { 
      name: 'Vega EVX Electric Super Car Headed To Geneva With 804 HP',
      campaignName: 'VEGA Innovation',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.Eak-XmLRk42PkzvDtgT2QwHaEu?w=350&h=183&c=7&r=0&o=5&pid=1.7'
    },
    { 
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.CHSYo7LrEZdfmUUvGkyPigHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7' 
    },
    { 
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.gIC1WV1MozLQa0sZzSxGtgAAAA?w=222&h=178&c=7&r=0&o=5&pid=1.7' 
    },
  ];

  additionalCampaigns2: any[] = [
    { 
      name: 'Vega EVX Electric Super Car Headed To Geneva With 804 HP',
      campaignName: 'VEGA Innovation',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.Eak-XmLRk42PkzvDtgT2QwHaEu?w=350&h=183&c=7&r=0&o=5&pid=1.7'
    },
    { 
      name: 'Lia Demo Video Artificial Intelligence Chatbot Serve Your Customers 24/7',
      campaignName: 'CodeGen',
      sentiment: 75,
      progress: 50,
      imageUrl: 'https://th.bing.com/th/id/OIP.CHSYo7LrEZdfmUUvGkyPigHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7' 
    },
  ];

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  toggleAdditionalCards(): void {
    this.showAdditionalCards = !this.showAdditionalCards;
  }

  viewCampaign(card: any) {
    // Handle the click event, e.g., navigate to a campaign detail page
  }

  selectPlatform(platform: string) {
    // Implement your selectPlatform logic here
    console.log('Selected platform:', platform);
  }

}


