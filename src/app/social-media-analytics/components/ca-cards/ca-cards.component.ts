import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ca-cards',
  templateUrl: './ca-cards.component.html',
  styleUrls: ['./ca-cards.component.scss']
})
export class CaCardsComponent {
  @Input() campaigns: any[] = [];
  @Input() showAdditionalCards: boolean = false;

  viewCampaign(card: any) {
    // Handle the click event, e.g., navigate to a campaign detail page
  }
}
