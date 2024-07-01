import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-suggestion-card',
  templateUrl: './dashboard-suggestion-card.component.html',
  styleUrl: './dashboard-suggestion-card.component.scss'
})
export class DashboardSuggestionCardComponent {
  smallText: string = "New";
  number: number = 314;
  displayedNumber: string = "314";
  bigText: string = "Suggestions";
  avgMetric: number = 6.9;
  context = "decrease";
}
