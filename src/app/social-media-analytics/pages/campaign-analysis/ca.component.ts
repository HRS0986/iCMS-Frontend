import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content } from '../../models/main-types';
import { CampaignAnalysisApiService } from '../../services/campaign-analysis-api.service';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss']
})
export class CAComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [
    { label: "Social Media Analytics" },
    { label: "Campaign Analysis" }
  ];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstagram = { title: 'Instagram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  caPageItem1: Content = { title: 'Top Performing Campaigns on Facebook' };
  caPageItem2: Content = { title: 'Top Performing Campaigns on Instagram' };
  caPageItem3: Content = { title: 'Top Performing Campaigns on Twitter' };

  topBarCaption = "Add New:";
  showAdditionalCards: boolean = false;
  topCampaigns: any[] = [];

  additionalCampaigns1: any[] = [];

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(private campaignAnalysisApiService: CampaignAnalysisApiService) { }

  ngOnInit(): void {
    this.fetchCampaignData();
  }

  fetchCampaignData(): void {
    this.campaignAnalysisApiService.getCAData("2024-05-01", "2024-07-30").subscribe(response => {
      this.processCampaignData(response["SM01"]);
    });
  }

  processCampaignData(campaignData: any[]): void {
    this.topCampaigns = campaignData.map(campaign => ({
      name: campaign.description.split('\n')[0],
      campaignName: campaign.company,
      color: campaign.color,
      likesCount: campaign.total_likes,
      likesChange: campaign.like_increment,
      commentsCount: campaign.total_comments,
      commentsChange: campaign.comment_increment,
      dataSentimentLabels: Array.from({ length: campaign.s_score_arr.length }, (_, i) => `${i + 1}`),
      dataSentimentValues: campaign.s_score_arr,
      imageUrl: campaign.img_url,
      postUrl: campaign.post_url,
    }));
    console.log('Top Campaigns:', this.topCampaigns);
  }


  toggleAdditionalCards(): void {
    this.showAdditionalCards = !this.showAdditionalCards;
  }

  selectPlatform(platform: string) {
    console.log('Selected platform:', platform);
  }
}
