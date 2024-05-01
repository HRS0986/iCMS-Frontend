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
  resetWidgetData() {
    this.selectedChartType = null;
    this.title = '';
  }
  chartTitles: any[] = [
    { label: 'Chart Title 1', value: 'option1' }, // You can add value properties for your data
    { label: 'Chart Title 2', value: 'option2' },
    { label: 'Chart Title 3', value: 'option3' },
  ];
  


}
