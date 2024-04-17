import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { NotificationService } from '../notification-service/notification.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-unread-notifications',
  templateUrl: './unread-notifications.component.html',
  styleUrl: './unread-notifications.component.scss'
})
export class UnreadNotificationsComponent implements OnInit {

  notifications: Message[] = [];
  readNotifications: Message[]= [];
  notificationCount: number = 0;
  emptyUnread:boolean=true;
  refreshTime:number = 1000;

  constructor(private notificationService: NotificationService) 
  {}

  ngOnInit(): void {
    timer(0, this.refreshTime).subscribe(() => {
      this.fetchNotifications();
      this.updateOldNotificationsAsUnread();
      
    });
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe(
      (newNotifications) => {

        if(newNotifications.length!==0){
          const newIds = newNotifications.map((notification: { id: any }) => notification.id);
        
          // Remove notifications that are not present in the new API response
          this.notifications = this.notifications.filter(notification => newIds.includes(notification.id));
    
          // Iterate over each new notification
          for (const newNotification of newNotifications) {
            // Check if the notification already exists in the list
            const existingNotificationIndex = this.notifications.findIndex(notification => notification.id === newNotification.id);
            
            if (existingNotificationIndex === -1) {
              // If the notification doesn't exist, add it to the list
              const newMessage: Message = {
                severity: "info",
                summary: newNotification.email,
                detail: newNotification.alert,
                id: newNotification.id ,// Assuming id is a unique identifier for notifications,
                data:newNotification.created_at
              };
              this.notifications.push(newMessage);
            }
          }
          
          this.readNotifications = this.notifications;

          this.notificationCount = this.notifications.length;
          this.emptyUnread=true
          
        }
        else if (this.emptyUnread) {
          this.notifications = [{severity: "info", summary: "No Notifications", detail: "Empty" }];
          this. emptyUnread = false      
        }
        
      },
      (error) => {
        console.error('Error fetching notifications: ', error);
      }
    );
  }

  
  updateOldNotificationsAsUnread() {
    // Iterate over each read notification array
    for (const readNotificationArray of this.readNotifications) {
        // Accessing the first item in the array
        const readNotification = readNotificationArray;

        // Check if the notification exists in the current list of notifications
        const existingNotificationIndex = this.notifications.findIndex(notification => notification.id === readNotification.id);
        console.log(this.readNotifications);
        if (existingNotificationIndex === -1) {
          this.refreshTime = 1000;
            // If the notification doesn't exist, mark it as unread
            this.notificationService.updateUnreadNotifications({"id": readNotification.id}).subscribe(
                (response) => {
                    console.log('Notification marked as unread successfully:', response);
                },
                (error) => {
                    console.error('Error marking notification as unread:', error);
                }
            );
        }
        else{
          this.refreshTime = 1200;
        }
    }
}

}
