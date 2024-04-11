import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from '../../services/summary.service';
import { EmailThread } from '../../interfaces/summary';
@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {

  constructor(private summaryService: SummaryService) { }
  @Input() title!: string;
  @Input() receiver!: string;
  @Input() sender!: string;
  @Input() sentiment!: string;
  @Input() summary!: string;
  @Input() threadId!: string;

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
