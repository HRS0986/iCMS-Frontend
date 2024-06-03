import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
// import { NotificationCountService } from './notification-count-service/notification-count.service';
import { NotificationCountService } from '../../shared-services/notification-count.service';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  notificationCount: number = 0;

  constructor(private notificationService: NotificationCountService) {}

  ngOnInit(): void {

    timer(0, 1000).subscribe(() => {
      // this.notificationService.getNotificationsCounts().subscribe(
      //   (notifications) => {
      //     this.notificationCount = notifications;
      //   },
      // );
    });


  }


}
