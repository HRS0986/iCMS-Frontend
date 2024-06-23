import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-inquiry-card',
  templateUrl: './dashboard-inquiry-card.component.html',
  styleUrl: './dashboard-inquiry-card.component.scss'
})
export class DashboardInquiryCardComponent {
  smallText: string = "New";
  bigText: string = "Inquiries";
  number: number = 123;
  displayedNumber: string = "123";
  avgMetric: number = 0;
  context = "same";
}
