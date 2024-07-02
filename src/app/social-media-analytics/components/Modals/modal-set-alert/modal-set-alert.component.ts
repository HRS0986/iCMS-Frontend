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
  selector: 'app-modal-set-alert',
  templateUrl: './modal-set-alert.component.html',
  styleUrls: ['./modal-set-alert.component.scss'],
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
export class ModalSetAlertComponent implements OnInit {
  
  notificationTypes: any[] = [];
  selectedNotificationType: any;
  topBarCaption: string = "Add New";
  visible: boolean = false;
  
  modalSetAlertForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private settingsApiService: SettingsApiService,
    private messageService: MessageService){
    this.modalSetAlertForm = this.formBuilder.group({
      topic: ['', Validators.required],
      min_val: ['', Validators.required],
      max_val: ['', Validators.required],
      alert_type: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.notificationTypes = [
      { name: 'Email Notification', icon: 'assets/social-media/icons/email-notification.png' },
      { name: 'App Notification', icon: 'assets/social-media/icons/APP-notification.png' }
    ];
  }

  showDialog() {
    this.visible = true;
  }

  onSubmitModalSetAlertForm() {
    if(this.modalSetAlertForm.valid){
      const formData = this.modalSetAlertForm.value;
      if(formData.alert_type.name == 'Email Notification'){
        formData.alert_type = 'email';
      }
      else if(formData.alert_type.name == 'App Notification'){
        formData.alert_type = 'app';
      }
      console.log(formData);
      this.settingsApiService.setTopicAlerts(formData).subscribe(
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