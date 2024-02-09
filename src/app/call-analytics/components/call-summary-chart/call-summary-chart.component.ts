import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-call-summary-chart',
  templateUrl: './call-summary-chart.component.html',
  styleUrl: './call-summary-chart.component.scss'
})
export class CallSummaryChartComponent implements OnInit {
  summaryCalls:any = [];
  statusColors!: {[key: string]: string};

  constructor() {
  }

  ngOnInit() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.summaryCalls = [
      { "title": "Call Recording Title", "date": (new Date()).toLocaleDateString(), "status": "Positive" },
      { "title": "Call Recording Title", "date": (new Date()).toLocaleDateString(), "status": "Negative" },
      { "title": "Call Recording Title", "date": (new Date()).toLocaleDateString(), "status": "Neutral" },
      { "title": "Call Recording Title", "date": (new Date()).toLocaleDateString(), "status": "Negative" },
      { "title": "Call Recording Title", "date": (new Date()).toLocaleDateString(), "status": "Positive" },
    ];

    this.statusColors = {
      "Positive": documentStyle.getPropertyValue("--positive-color"),
      "Negative": documentStyle.getPropertyValue("--negative-color"),
      "Neutral": documentStyle.getPropertyValue("--neutral-color")
    }
  }
}
