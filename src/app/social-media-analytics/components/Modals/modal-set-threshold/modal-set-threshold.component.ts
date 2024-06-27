import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

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
}