import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Campaign, CampaignData } from '../../models/campaign-analysis';
import { SettingsApiService } from '../../services/settings-api.service';
import { ModalAddNewCampaignComponent } from '../../components/Modals/modal-add-new-campaign/modal-add-new-campaign.component';

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

  content1: CampaignData = { subtitle: 'Facebook', data: [] };
  content2: CampaignData = { subtitle: 'Instagram', data: [] };
  content3: CampaignData = { subtitle: 'Twitter', data: [] };

  constructor(private settingsApiService: SettingsApiService) { }

  ngOnInit(): void {
    this.fetchCampaignsBySM();
  }

  fetchCampaignsBySM(): void {
    this.settingsApiService.getCampaigns().subscribe(
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
