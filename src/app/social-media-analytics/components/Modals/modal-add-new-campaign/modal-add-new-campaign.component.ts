import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AlertType } from '../../../models/settings';
import { SettingsApiService } from '../../../services/settings-api.service';
interface Platform {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-modal-add-new-campaign',
  templateUrl: './modal-add-new-campaign.component.html',
  styleUrls: ['./modal-add-new-campaign.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
})
export class ModalAddNewCampaignComponent {
  visible: boolean = false;
  postTitle: string | undefined;
  company: string | undefined;
  platforms: Platform[]; // Renamed from 'platform' to 'platforms'
  selectedPlatform: Platform | undefined;
  
  modalAddNewSentimentForm: FormGroup;
  
  constructor(
    private settingsApiService: SettingsApiService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.modalAddNewSentimentForm = this.formBuilder.group({
      platform: ['', Validators.required],
      post_description_part: ['', Validators.required],
      
    });
    
    this.platforms = [
      { name: 'Facebook', icon: 'assets/social-media/icons/facebook.png' },
      { name: 'Instagram', icon: 'assets/social-media/icons/instargram.png' },
      { name: 'Twitter', icon: 'assets/social-media/icons/twitter.png' },
    ];
  }

  showDialog() {
    this.visible = true;
  }

  onSubmitModalAddNewSentimentForm() {
    if(this.modalAddNewSentimentForm.valid){
      const formData = this.modalAddNewSentimentForm.value;
      if(formData.platform.name == 'Facebook'){
        formData.platform = 'SM01';
      }
      else if(formData.platform.name == 'Instagram'){
        formData.platform = 'SM02';
      }
      console.log(formData);
      this.settingsApiService.setCampaigns(formData).subscribe(
        (response) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Campaign added successfully'});
          this.visible = false;
        },
        (error) => {
          console.log(error);
          this.messageService.add({severity:'error', summary:'Error', detail:'Error adding campaign'});
        }
      );  

    }
    else{
      this.messageService.add({severity:'error', summary:'Error', detail:'Please fill all required fields'});

    }

  }


}