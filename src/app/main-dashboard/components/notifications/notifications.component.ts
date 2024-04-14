import { Component,OnInit } from '@angular/core';
import { interval,timer } from 'rxjs';
import { startWith,switchMap } from 'rxjs';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { NotificationService } from './notification.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  providers: [MessageService]
})
export class NotificationsComponent implements OnInit{

  activeIndex: number = 0;
  //create string array to store tab title and content
  list: string[] = ["Unread", "Read"];

  tabs: { title: string; content: string }[] = [];
  breadcrumbItems: MenuItem[] = [
    {label: "Notifications"},
    {label: this.list[this.activeIndex]}
  ];

  

  clickTab(event: any) {
    console.log(this.activeIndex);
    if(this.activeIndex===1){
      console.log("clicktap");
      this.ReadNotification();
      this.Read = true;
      this.Unread = false;
    }
    else if (this.activeIndex===0)
      {
        console.log("clicktap");
      this.Read = false;
      this.Unread = true;
      }
    this.breadcrumbItems = [
      {label: "Notifications"},
      {label: this.list[this.activeIndex]}
    ];
    
  }

  notifications: Message[] = [];
  readNotifications: Message[]= [];
  Readnotifications: Message[] = [];
  unreadnotifications: Message[] = [];
  notificationCount: number = 0;
  ReadCount: number = 0;
  UnreadCount: number = 1;
  viewNotifications: boolean = false;
  Read: boolean = false;
  emptyUnread:boolean=true;
  emptyRead:boolean=true;
  Unread: boolean = true;
  ShowContent:Message = {};
  RefreshTime:number = 2000;

  constructor(private notificationService: NotificationService, private confirmationService: ConfirmationService) 
  {}


  ngOnInit(): void {
    this.tabs = [
      { title: "Unread", content: "Unread Notifications"},
      { title: "Read", content: "Read Notifications"}
    ];

    this.viewNotifications = !this.viewNotifications;
    this.NotificationsCount();

    // this.fetchNotifications();

    timer(0, this.RefreshTime).subscribe(() => {
      console.log(this.notificationCount);
      if(this.Unread && this.RefreshTime<=2000){
        this.updateOldNotificationsAsUnread();
        this.fetchNotifications();
        
      }
      else if(this.Read && this.RefreshTime<=2000){
        this.updateOldNotificationsAsRead();
        console.log("Timer");
        this.ReadNotification();        
      }  
      this.NotificationsCount();
    });

    timer(0, 1000).subscribe(() => {
      if (this.Unread) {
        this.updateOldNotificationsAsUnread();
      } else {
        this.updateOldNotificationsAsRead();
        
      }
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
          console.log(this.notifications);        
        }
        
      },
      (error) => {
        console.error('Error fetching notifications: ', error);
      }
    );
  }
  
  
  
  

  NotificationsCount() {
    interval(1000) // Fetch notification count every 1 second
      .pipe(
        startWith(0), // Emit initial value to trigger the first fetch immediately
        switchMap(() => this.notificationService.getNotifications())
      )
      .subscribe(
        (notifications) => {
          this.notificationCount = notifications.length;
        },
        (error) => {
          console.error('Error fetching notification count: ', error);
        }
      );
  }
  

  showNotifications() {
    this.Read = false;
    this.Unread = true;
    this.viewNotifications = !this.viewNotifications;
  }

  updateOldNotificationsAsUnread() {
    // Iterate over each read notification array
    for (const readNotificationArray of this.readNotifications) {
        // Accessing the first item in the array
        const readNotification = readNotificationArray;

        // Check if the notification exists in the current list of notifications
        const existingNotificationIndex = this.notifications.findIndex(notification => notification.id === readNotification.id);
        
        if (existingNotificationIndex === -1) {
          this.RefreshTime = 3000;
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
          this.RefreshTime = 2000;
        }
    }
}



  

  ReadNotification() {
    console.log("Readnotification");
    this.notificationService.getReadNotifications().subscribe(
      (notifications) => {
        

        if(notifications.length!==0){
        // Iterate over each read notification
        for (const notification of notifications) {
          // Check if the notification already exists in the list
          const existingNotificationIndex = this.Readnotifications.findIndex(readNotification => readNotification.id === notification.id);
          if (existingNotificationIndex === -1) {
            // If the notification doesn't exist, add it to the list
            const newMessage: Message = {
              severity: "success",
              detail: notification.alert,
              summary: notification.email,
              id: notification.id ,// Assuming id is a unique identifier for notifications
              data:notification.created_at
            };
            this.Readnotifications.push(newMessage);
          }
        }
        this.emptyRead=true
        this.unreadnotifications = this.Readnotifications;
      }
      else if (this.emptyRead) {
        this.Readnotifications = [{severity: "success", summary: "No Notifications", detail: "Empty" }];
        this. emptyRead = false 
        console.log(this.Readnotifications);        
      }
        // Update the Read flag
      },
      (error) => {
        console.error('Error fetching notifications: ', error);
      }
    
    );
  }

  updateOldNotificationsAsRead() {
    // Iterate over each read notification
    for (const readNotification of this.unreadnotifications) {
      // Check if the notification exists in the current list of notifications
      const existingNotificationIndex = this.Readnotifications.findIndex(notification => notification.id === readNotification.id);
      
      if (existingNotificationIndex === -1) {
        this.RefreshTime = 3000;
        // If the notification doesn't exist, mark it as unread
        console.log(readNotification.id);
        this.notificationService.updateReadNotifications({"id": readNotification.id}).subscribe(
          (response) => {
            console.log('Notification marked as unread successfully:', response);
          },
          (error) => {
            console.error('Error marking notification as unread:', error);
          }
        );
      }
      else{
        this.RefreshTime = 2000;
      }
    }
  }


  visible:boolean = false;
  showDialog(notifications: Message){
    this.visible = true;
    this.ShowContent =notifications
  }

}
