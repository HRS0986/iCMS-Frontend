import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface platform {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-modal-add-new-campaign',
  templateUrl: './modal-add-new-campaign.component.html',
  styleUrls: ['./modal-add-new-campaign.component.scss'], // Update styleUrls if needed
  standalone: true,
  imports: [
    CommonModule, // Include CommonModule here
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule
  ],
})
export class ModalAddNewCampaignComponent {
  visible: boolean = false;
  postTitle: string | undefined;
  company: string | undefined;
  platform: platform[] | undefined;
  selectedPlatform: platform | undefined; // corrected 'selectedPlatform' spelling

  constructor() {
    this.platform = [
      { name: 'Facebook',icon: 'assets/social-media/icons/facebook.png' },
      { name: 'Instagram' ,icon: 'assets/social-media/icons/instargram.png'},
      { name: 'Twitter', icon: 'assets/social-media/icons/twitter.png' },
    ];
  }
  topBarCaption = "Export Data";
  showDialog() {
    this.visible = true;
  }
}
