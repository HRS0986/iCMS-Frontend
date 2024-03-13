import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-summary-cards-container',
  templateUrl: './summary-cards-container.component.html',
  styleUrl: './summary-cards-container.component.scss'
})
export class SummaryCardsContainerComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Summary"}
  ];
}
