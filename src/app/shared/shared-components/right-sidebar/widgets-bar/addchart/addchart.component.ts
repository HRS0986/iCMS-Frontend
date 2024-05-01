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
  stateOptions: any[] = [
    {
      label: 'Line Chart',
      value: 'line-chart',
      icon:'pi pi-chart-line'
    },
    {
      label: 'Bar Chart',
      value: 'bar-chart',
      icon: 'pi pi-chart-bar'
    },
    {
      label: 'Horizontal Bar Chart',
      value: 'horizontal-bar-chart',
      icon: 'pi pi-chart-bar',
    },
    {
      label: 'Pie Chart',
      value: 'pie-chart',
      icon: 'pi pi-chart-pie'
    },
    {
      label: 'Word Cloud',
      value: 'word-cloud',
      icon: 'pi pi-slack'
    },
    {
      label: 'Table',
      value: 'table',
      icon: 'pi pi-table'
    }

    ];

  value: any;
  selectedCities: any;
  sources = [
    {name: 'email', code: 'email'},
    {name: 'social', code: 'social'},
    {name: 'call', code: 'call'},

  ]

  keywords = [
    {
    id: 1,
    name: 'keyword1'
    },
    {
      id: 2,
      name: 'keyword2'
    },
    {
      id: 3,
      name: 'keyword3'
    },
    {
      id: 4,
      name: 'keyword4'
    },
    {
      id: 5,
      name: 'keyword5'
    },
    {
      id: 6,
      name: 'keyword6'
    },
    {
      id: 7,
      name: 'keyword7'
    },
    {
      id: 8,
      name: 'keyword8'
    },
    {
      id: 9,
      name: 'keyword9'
    },
    {
      id: 10,
      name: 'keyword10'
    },

  ];
  selectedKeywords: any;

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
  


  saveWidget() {

  }
}
