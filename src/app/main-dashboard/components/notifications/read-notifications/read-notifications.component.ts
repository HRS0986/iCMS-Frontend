import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { NotificationService } from '../../../services/notification.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateRangeService } from '../../../services/shared-date-range/date-range.service';

@Component({
  selector: 'app-read-notifications',
  templateUrl: './read-notifications.component.html',
  styleUrl: './read-notifications.component.scss'
})
export class ReadNotificationsComponent implements OnInit {

  showDatePicker: boolean = true;
  sidebarVisible: boolean = true;
  rangeDates: Date[] | undefined;

  visible:boolean =false;
  showData:any[]=[];

  filteredNotifications: Message[] = [];

  readnotifications: Message[] = [{severity: "info", summary: "No Notifications", detail: "Empty" }];
  unreadnotifications: Message[] = [];
  emptyRead:boolean=true;
  refreshTime:number = 1000;

  private socketSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService,
    private dateRangeService:DateRangeService
  )
  {}

  ngOnInit(): void {
    this.readNotification();


    this.socketSubscription = this.notificationService.messages$.subscribe(
      message => {
        console.log(message);
        this.readNotification();
      }
  );

  this.dateRangeService.currentDateRange.subscribe(range => {
    if (range && range.length > 0) {
      const startDate = new Date(range[0]);
      let endDate = new Date(range[0]);

      if (range[1]) {
        endDate = new Date(range[1]);
      }
      this.filteredNotifications = this.readnotifications.filter(notification => {
        console.log(notification.summary);
        const notificationDate = new Date(notification.summary || '');
        // Include the end date in the range
        return notificationDate >= startDate && notificationDate <= endDate;
      });
    } else {
      this.filteredNotifications = this.readnotifications;
    }
  });

  }

  viewNotification(notification:any){
    console.log(notification);
    this.visible=true;
    this.showData=[notification['summary'],notification['data'],notification['detail']];

  }

  addMessages(){
   this.readNotification();
  }

  clearMessages(){
    const existingNotificationDicts = this.readnotifications.map(notification => ({ id: notification.id }));
    console.log(existingNotificationDicts);
    this.readnotifications = [];
    this.unreadnotifications= [];
    this.filteredNotifications=[];
    this.notificationService.updateReadNotifications(existingNotificationDicts).subscribe(
      (response) => {

      },
  );
  }

  onDateRangeChange() {
    if (this.rangeDates && this.rangeDates.length > 0) {
      const startDate = new Date(this.rangeDates[0]);
      let endDate = new Date(this.rangeDates[0]);

      if (this.rangeDates[1]) {
        endDate = new Date(this.rangeDates[1]);
      }

      this.filteredNotifications = this.readnotifications.filter(notification => {
        console.log(notification.summary);
        const notificationDate = new Date(notification.summary || '');
        // Include the end date in the range
        return notificationDate >= startDate && notificationDate <= endDate;
      });
    } else {
      this.filteredNotifications = this.readnotifications;
    }
  }

  dateReset(){
    this.rangeDates=[];
    this.onDateRangeChange();
  }

  filterNotificationsByDate() {
    if (this.rangeDates && this.rangeDates.length === 2) {
      const [startDate, endDate] = this.rangeDates;
      this.filteredNotifications = this.readnotifications.filter(notification => {
        console.log(notification.summary);
        const notificationDate = new Date(notification.summary || '');
        return notificationDate >= startDate && notificationDate <= endDate;
      });
    } else {
      this.filteredNotifications = this.readnotifications;
    }
  }


  readNotification() {
    this.notificationService.getReadNotifications().subscribe(
      (notifications) => {
        console.log(notifications);
        if(notifications.length!=0){
          const newIds = notifications.map((notification: { id: any }) => notification.id);
          this.readnotifications = this.readnotifications.filter(notification => newIds.includes(notification.id));
        // Iterate over each read notification
        for (const notification of notifications) {
          // Check if the notification already exists in the list
          const existingNotificationIndex = this.readnotifications.findIndex(readNotification => readNotification.id === notification.id);
          if (existingNotificationIndex === -1) {
            // If the notification doesn't exist, add it to the list
            const newMessage: Message = {
              severity: "success",
              detail: notification.alert,
              summary: notification.created_at,
              id: notification.id ,// Assuming id is a unique identifier for notifications
              data:notification.email
            };
            this.readnotifications.push(newMessage);
          }
        }
        this.emptyRead=true
        this.filteredNotifications=this.readnotifications;
        this.unreadnotifications = this.readnotifications;
      }
      else if (this.emptyRead) {
        this.readnotifications = [{severity: "success", summary: "No Notifications", detail: "Empty" }];
        this.filteredNotifications=this.readnotifications;
        this. emptyRead = false
      }
      },

    );
  }

}
