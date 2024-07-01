import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card-mgr-analytics',
  templateUrl: './stat-card-mgr-analytics.component.html',
  styleUrl: './stat-card-mgr-analytics.component.scss'
})
export class StatCardMgrAnalyticsComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() subheader!: string;
  @Input() header!: string;
  @Input() fontColor!: string; 
}
