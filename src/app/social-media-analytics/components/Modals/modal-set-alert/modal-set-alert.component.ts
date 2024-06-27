import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

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
    InputNumberModule
  ]
})
export class ModalSetAlertComponent implements OnInit {
  
  notificationTypes: any[] = [];
  selectedNotificationType: any;
  topBarCaption: string = "Add New";
  visible: boolean = false;
  
  minValue: number = 0;
  maxValue: number = 0;

  ngOnInit() {
    this.notificationTypes = [
      { name: 'Email Notification', icon: 'assets/social-media/icons/email-notification.png' },
      { name: 'APP Notification', icon: 'assets/social-media/icons/APP-notification.png' }
    ];
  }

  showDialog() {
    this.visible = true;
  }
}