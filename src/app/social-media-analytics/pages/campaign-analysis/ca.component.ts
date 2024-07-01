import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from "primeng/api";
import { CampaignAnalysisApiService } from '../../services/campaign-analysis-api.service';
import { TabStateService } from '../../services/tab-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss']
})
export class CAComponent implements OnInit, OnDestroy {
  loading: boolean = true;

  breadcrumbItems: MenuItem[] = [
    { label: "Social Media Analytics" },
    { label: "Campaign Analysis" }
  ];

  private subscription: Subscription = new Subscription();

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstagram = { title: 'Instagram', img: 'assets/social-media/icons/instargram.png' };

  caPageContent = { subtitle: 'Top Performing Campaigns', topCampaigns: [], additionalCampaigns: [] };

  topBarCaption = "Add New:";
  showAdditionalCards: boolean = false;

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(
    private campaignAnalysisApiService: CampaignAnalysisApiService,
    private tabStateService: TabStateService
  ) { }

  ngOnInit(): void {
    this.subscription = this.tabStateService.activeTab$.subscribe((tabName: string) => {
      let platform = "SM01";
      if (tabName === "Instagram") {
        platform = "SM02";
      }
      this.loading = true;

      this.campaignAnalysisApiService.getCAData(platform).subscribe(response => {
        const campaignsContent = response;
        campaignsContent.forEach((item: any) => {
          if (item.description.length > 40) {
            item.description = item.description.slice(0, 40) + '...';
          }
          item.dataSentimentLabels = Array.from({ length: item.s_score_arr.length }, (_, i) => `${i + 1}`);
        });
        this.caPageContent.topCampaigns = campaignsContent;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleAdditionalCards(): void {
    this.showAdditionalCards = !this.showAdditionalCards;
  }

  selectPlatform(platform: string) {
    console.log('Selected platform:', platform);
  }
}
