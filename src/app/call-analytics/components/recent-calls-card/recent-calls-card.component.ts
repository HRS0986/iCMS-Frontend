import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-calls-card',
  templateUrl: './recent-calls-card.component.html',
  styleUrl: './recent-calls-card.component.scss'
})
export class RecentCallsCardComponent implements OnInit {
  recentCalls:any = [];
  statusColors!: {[key: string]: string};

  constructor() {
  }

  ngOnInit() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.recentCalls = [
      { "title": "Call Recording Name", "date": (new Date()).toLocaleDateString(), "status": "Positive" },
      { "title": "Call Recording Name", "date": (new Date()).toLocaleDateString(), "status": "Negative" },
      { "title": "Call Recording Name", "date": (new Date()).toLocaleDateString(), "status": "Neutral" },
      { "title": "Call Recording Name", "date": (new Date()).toLocaleDateString(), "status": "Negative" },
      { "title": "Call Recording Name", "date": (new Date()).toLocaleDateString(), "status": "Positive" },
    ];

    this.statusColors = {
      "Positive": documentStyle.getPropertyValue("--positive-color"),
      "Negative": documentStyle.getPropertyValue("--negative-color"),
      "Neutral": documentStyle.getPropertyValue("--neutral-color")
    }
  }
}
