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

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstagram = { title: 'Instagram', img: 'assets/social-media/icons/instargram.png' };

  contentFacebook: CampaignData = { subtitle: 'Facebook', data: [] };
  contentInstagram: CampaignData = { subtitle: 'Instagram', data: [] };

  constructor(private settingsApiService: SettingsApiService) { }

  ngOnInit(): void {
    this.fetchCampaignsBySM();
  }

  fetchCampaignsBySM(): void {
    this.settingsApiService.getCampaigns().subscribe(
      (response: Campaign[]) => {

        const FacebookData = response["SM01" as keyof typeof response] as Campaign[];
        FacebookData.forEach((item: any) => {
          if (item.description.length > 40) {
            item.description = item.description.slice(0, 40) + '...';
          }
        });
        this.contentFacebook.data = FacebookData;

        const InstagramData = response["SM02" as keyof typeof response] as Campaign[];
        InstagramData.forEach((item: any) => {
          if (item.description.length > 40) {
            item.description = item.description.slice(0, 40) + '...';
          }
        });
        this.contentInstagram.data = InstagramData;

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
