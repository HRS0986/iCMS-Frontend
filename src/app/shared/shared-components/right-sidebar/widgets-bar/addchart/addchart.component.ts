import { Component } from '@angular/core';

@Component({
  selector: 'app-addchart',
  templateUrl: './addchart.component.html',
  styleUrl: './addchart.component.scss'
})
export class AddchartComponent {
  title: string | undefined;
  sidebarVisible: boolean;
  chartType: string;
  selectedChartType: string | null = null;


  selectChartType(type: string) {
    this.selectedChartType = type;
  }

  constructor() {
    this.sidebarVisible = false;
    this.chartType = '';

  }


}
