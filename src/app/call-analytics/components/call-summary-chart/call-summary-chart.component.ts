import { Component,OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-call-summary-chart',
  templateUrl: './call-summary-chart.component.html',
  styleUrl: './call-summary-chart.component.scss'
  
})
export class CallSummaryChartComponent implements OnInit {
  summaryCalls:any = [];
  statusColors!: {[key: string]: string};
  visibleSummary: boolean = false;
  visiblePlay: boolean = false;
  visibleConfirmation: boolean = false;
  selectedCall: any; // Add a property to store the selected call details
  noCalls: boolean = false;
  // ... rest of your component code

  showDialogSummary(call: any): void {
    this.selectedCall = call;
    this.visibleSummary = true;
  }
  showDialogPlay(call: any): void {
    this.selectedCall = call;
    this.visiblePlay = true;
  }
  showDialogConfirmation(call: any): void {
    this.selectedCall = call;
    this.visibleConfirmation = true;
  }
 
  constructor() {
  }

  ngOnInit() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.summaryCalls = [
      { "title": "Call Recording Title1", "date": (new Date()).toLocaleDateString(), "status": "Positive" },
      { "title": "Call Recording Title2", "date": (new Date()).toLocaleDateString(), "status": "Negative" },
      { "title": "Call Recording Title3", "date": (new Date()).toLocaleDateString(), "status": "Neutral" },
      { "title": "Call Recording Title4", "date": (new Date()).toLocaleDateString(), "status": "Negative" },
      { "title": "Call Recording Title5", "date": (new Date()).toLocaleDateString(), "status": "Positive" },
    ];
    console.log('Initial summaryCalls:', this.summaryCalls);

    // Check if summaryCalls has no elements, then set noCalls to true
    this.noCalls = this.summaryCalls.length == 0;

    console.log('noCalls:', this.noCalls);
    this.statusColors = {
      "Positive": documentStyle.getPropertyValue("--positive-color"),
      "Negative": documentStyle.getPropertyValue("--negative-color"),
      "Neutral": documentStyle.getPropertyValue("--neutral-color")
    }
  }
}
