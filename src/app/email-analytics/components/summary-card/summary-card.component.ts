import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() title!: string;
  @Input() receiver!: string;
  @Input() sender!: string;
  @Input() sentiment!: string;
  @Input() summary!: string;
}
