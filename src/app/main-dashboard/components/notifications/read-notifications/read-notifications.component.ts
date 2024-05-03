import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { NotificationService } from '../../../services/notification.service';
import { OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-read-notifications',
  templateUrl: './read-notifications.component.html',
  styleUrl: './read-notifications.component.scss'
})
export class ReadNotificationsComponent implements OnInit {

  readnotifications: Message[] = [];
  unreadnotifications: Message[] = [];
  emptyRead:boolean=true;
  refreshTime:number = 1000;

  constructor(private notificationService: NotificationService)
  {}

  ngOnInit(): void {
    timer(0, this.refreshTime).subscribe(() => {
      this.readNotification();
      this.updateOldNotificationsAsRead();
    });
  }


  readNotification() {
    this.notificationService.getReadNotifications().subscribe(
      (notifications) => {

        if(notifications.length!==0){
        // Iterate over each read notification
        for (const notification of notifications) {
          // Check if the notification already exists in the list
          const existingNotificationIndex = this.readnotifications.findIndex(readNotification => readNotification.id === notification.id);
          if (existingNotificationIndex === -1) {
            // If the notification doesn't exist, add it to the list
            const newMessage: Message = {
              severity: "success",
              detail: notification.alert,
              summary: notification.email,
              id: notification.id ,// Assuming id is a unique identifier for notifications
              data:notification.created_at
            };
            this.readnotifications.push(newMessage);
          }
        }
        this.emptyRead=true
        this.unreadnotifications = this.readnotifications;
      }
      else if (this.emptyRead) {
        this.readnotifications = [{severity: "success", summary: "No Notifications", detail: "Empty" }];
        this. emptyRead = false
      }
      },

    );
  }



  updateOldNotificationsAsRead() {
    // Iterate over each read notification
    for (const readNotification of this.unreadnotifications) {
      // Check if the notification exists in the current list of notifications
      const existingNotificationIndex = this.readnotifications.findIndex(notification => notification.id === readNotification.id);

      if (existingNotificationIndex === -1) {
        this.refreshTime = 1000;
        // If the notification doesn't exist, mark it as unread
        this.notificationService.updateReadNotifications({"id": readNotification.id}).subscribe(
          (response) => {
            
          },
        );
      }
      else{
        this.refreshTime = 1200;
      }
    }
  }


}
