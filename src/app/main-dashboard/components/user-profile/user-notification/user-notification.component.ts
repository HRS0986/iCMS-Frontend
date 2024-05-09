import {Component} from '@angular/core';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.scss'
})
export class UserNotificationComponent {
  //create array with notification settings
  notificationSettings: { name: string; status: boolean }[] = [
    { name: "Email Notification", status: true },
    { name: "Push Notification", status: false },
    { name: "Monthly Newsletter", status: true },
    { name: "Weekly Newsletter", status: false },
    { name: "Daily Newsletter", status: true },
    { name: "New Product Announcements", status: false },
    { name: "Product Updates", status: true },
    { name: "Blog Posts", status: false },
    { name: "Product Offers", status: true },
    { name: "Product Discounts", status: false }
  ];
  


}
