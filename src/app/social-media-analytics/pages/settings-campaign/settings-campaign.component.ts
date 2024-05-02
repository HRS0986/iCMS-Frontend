import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaign, Content } from '../../structs';

@Component({
  selector: 'settings-campaign',
  templateUrl: './settings-campaign.component.html',
  styleUrls: ['./settings-campaign.component.scss']
})
export class SettingsCampaignComponent implements OnInit {
  list_facebook: Campaign[] = [];
  list_instagram: Campaign[] = [];
  list_twitter: Campaign[] = [];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstagram = { title: 'Instagram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  content1: Content = { subtitle: 'Facebook', data: [] };
  content2: Content = { subtitle: 'Instagram', data: [] };
  content3: Content = { subtitle: 'Twitter', data: [] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCampaignsBySM();
  }

  fetchCampaignsBySM(): void {
    this.http.get<{ [key: string]: Campaign[] }>('http://127.0.0.1:8000/social-media/get_campaign_details')
      .subscribe(
        (response: { [key: string]: Campaign[] }) => {
          this.list_facebook = response['SM01'] || [];
          this.list_instagram = response['SM02'] || [];
          this.list_twitter = response['SM03'] || [];

          this.content1.data = this.list_facebook;
          this.content2.data = this.list_instagram;
          this.content3.data = this.list_twitter;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onRowEdit(item: Campaign): void {
    // Implement edit functionality
  }

  onRowDelete(item: Campaign): void {
    // Implement delete functionality
  }

  topBarCaption = 'Add New';
}
