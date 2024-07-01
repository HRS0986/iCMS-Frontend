import { Component,OnInit } from '@angular/core';
// import { interval,timer } from 'rxjs';
// import { startWith,switchMap } from 'rxjs';
// import { Message } from 'primeng/api';
// import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {NotificationService} from "../../services/notification.service"
import { MenuItem } from 'primeng/api';
// import { ChartsService } from '../../services/charts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  providers: [MessageService]
})
export class NotificationsComponent implements OnInit{

  private socketSubscription: Subscription | undefined;

  activeIndex: number = 0;
  //create string array to store tab title and content
  list: string[] = ["Unread","All"];
  // list: string[] = ["New", "Read"];
  constructor(private notificationService:NotificationService){}

  tabs: { title: string; content: string }[] = [];
  breadcrumbItems: MenuItem[] = [
    {label: "Notifications"},
    {label: this.list[this.activeIndex]}
  ];



  clickTab(event: any) {
    this.breadcrumbItems = [
      {label: "Notifications"},
      {label: this.list[this.activeIndex]}
    ];

  }

  ngOnInit(): void {
    this.tabs = [
      { title: "Unread", content: "Unread"},
      { title: "All", content: "All"}
    ];

    this.socketSubscription = this.notificationService.messages$.subscribe(
      message => {
        console.log(message);
      }
  );
  }

}
