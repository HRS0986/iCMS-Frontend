import { Component,OnInit } from '@angular/core';
import { NotificationsComponent } from '../../../main-dashboard/components/notifications/notifications.component';
import { NotificationService } from '../../../main-dashboard/components/notifications/notification.service';
import { interval,switchMap } from 'rxjs';
import { startWith } from 'rxjs';
import { timer } from 'rxjs';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})

export class TopMenuComponent implements OnInit{
  notificationCount: number=0;

  constructor(private notificationService:NotificationService) {}

  NotificationsCount() {
    interval(1000) // Fetch notification count every 1 second
      .pipe(
        startWith(0), // Emit initial value to trigger the first fetch immediately
        switchMap(() => this.notificationService.getNotifications())
      )
      .subscribe(
        (notifications) => {
          this.notificationCount = notifications.length;
          console.log(this.notificationCount);
        },
        (error) => {
          console.error('Error fetching notification count: ', error);
        }
      );
  }

  ngOnInit(): void {

    timer(0, 1000).subscribe(() => {
      this.NotificationsCount();
      
    });
  }

  

}
