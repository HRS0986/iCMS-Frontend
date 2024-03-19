import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { SummaryService } from '../../services/summary.service';
import { Summary } from '../../interfaces/summary';

@Component({
  selector: 'app-summary-cards-container',
  templateUrl: './summary-cards-container.component.html',
  styleUrl: './summary-cards-container.component.scss'
})
export class SummaryCardsContainerComponent implements OnInit {
  constructor(private summaryService: SummaryService) { }

  ngOnInit(): void {
    this.onGetSummaries();
  }

  summaries: Summary[] = [];

  onGetSummaries(): void {
    this.summaryService.getSummaries().subscribe((res) => this.summaries = res);
  }
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Summary"}
  ];
}
