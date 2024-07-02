import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SettingsApiService } from '../../../services/settings-api.service';

@Component({
  selector: 'app-modal-set-threshold',
  templateUrl: './modal-set-threshold.component.html',
  styleUrls: ['./modal-set-threshold.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule
  ]
})
export class ModalSetThresholdComponent implements OnInit {
  notificationTypes: any[] = [];
  selectedNotificationType: any;
  topBarCaption: string = "Add New";
  visible: boolean = false;
  
  minValue: number = 0;
  maxValue: number = 0;

  platforms: any[] = [];
  selectedPlatform: any;
  
  modalsetThresholdForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private settingsApiService: SettingsApiService,
    private messageService: MessageService
  ){
    this.modalsetThresholdForm = this.formBuilder.group({
      sm_id: ['', Validators.required],
      alert_type: ['', Validators.required],
      min_val: ['', Validators.required],
      max_val: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.notificationTypes = [
      { name: 'Email Notification', icon: 'assets/social-media/icons/email-notification.png' },
      { name: 'APP Notification', icon: 'assets/social-media/icons/APP-notification.png' }
    ];
    this.platforms = [
      { name: 'Facebook', icon: 'assets/social-media/icons/facebook.png' },
      { name: 'Instagram', icon: 'assets/social-media/icons/instargram.png' },
      { name: 'Twitter', icon: 'assets/social-media/icons/twitter.png' },
    ];
  }

  showDialog() {
    this.visible = true;
  }

  onSubmitSetThresoldForm() {
    if(this.modalsetThresholdForm.valid){
      const formData = this.modalsetThresholdForm.value;
      if(formData.alert_type.name == 'Email Notification'){
        formData.alert_type = 'email';
      }
      else if(formData.alert_type.name == 'APP Notification'){
        formData.alert_type = 'app';
      }
      if(formData.sm_id.name == 'Facebook'){
        formData.sm_id = 'SM01';
      }
      else if(formData.sm_id.name == 'Instagram'){
        formData.sm_id = 'SM02';
      }
      console.log(formData);
      this.settingsApiService.setThresold(formData).subscribe(
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