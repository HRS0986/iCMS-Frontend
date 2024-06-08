import {Component, Input, OnInit} from '@angular/core';
import {GridsterConfig, GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import { DisplayGrid, Draggable, PushDirections, Resizable} from 'angular-gridster2';
import { ChartData, ChartOptions } from 'chart.js';
import {LineAreaChartComponent} from "../charts/line-area-chart/line-area-chart.component";
import {GaugeChartComponent} from "../charts/gauge-chart/gauge-chart.component";
import {HorizontalBarChartComponent} from "../charts/horizontal-bar-chart/horizontal-bar-chart.component";
import {DoughnutChartComponent} from "../charts/doughnut-chart/doughnut-chart.component";

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
interface Safe extends GridsterConfig {
  resizable: Resizable;
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})

export class GridComponent implements OnInit {
  options!: Safe;
  dashboard!: Array<GridsterItem>;

  data!: ChartData;
  chartOptions!: ChartOptions;



  @Input() userChartInfo: {
    chartType: string,
    data: ChartData,
    options: ChartOptions
  }[] = [];

  constructor() {}
  ngOnInit(): void {
    // console.log(this.userChartInfo);
    this.options = {
      gridType: "scrollVertical",
      compactType: "compactUp",
      // margin: 10,
      // outerMargin: true,
      // outerMarginTop: null,
      // outerMarginRight: null,
      // outerMarginBottom: null,
      minCols: 6,
      maxCols: 6,
      minRows: 6,
      maxRows: 80,
      maxItemCols: 7,
      minItemCols: 1,
      maxItemRows: 10,
      minItemRows: 1,
      maxItemArea: 25,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 20,
      fixedRowHeight: 10,
      scrollSensitivity: 10,
      scrollSpeed: 8,
      draggable: {
        enabled: true,

      },
      resizable: {
        enabled: true,
        // start: GridComponent.eventStart,
        // stop: GridComponent.eventStop,
        handles:{
          s: false,
          e: false,
          n: false,
          w: false,
          se: true,
          ne: false,
          sw: false,
          nw: false,
        }
      },
      // swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      // disableWindowResize:false,
      disableWarnings: true,
      scrollToNewItems: true,
      // setGridSize:false,
      disableScrollHorizontal:true,

      //janith
      itemResizeCallback: this.itemResize.bind(this), // Add this line
      // itemChangeCallback: this.itemChange.bind(this),
    };

    this.dashboard = [
      {
        key:1,
        cols: 5,
        rows: 3,
        y: 0,
        x: 0,
        chartType: 'line',
        initialRatio: Math.round(5/3)
      },
      {
        key:2,
        cols: 2,
        rows: 3,
        y: 0,
        x: 2,
        chartType: 'gauge',
        initialRatio: Math.round(2/2)},
    ];




  this.data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#42A5F5',
        hoverBackgroundColor: '#64B5F6'
      }
    ]
  };

  this.chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

}



  removeItem($event: MouseEvent | TouchEvent, item:any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  getComponent(chartType: string) {
    switch (chartType) {
      case 'line':
        return LineAreaChartComponent;
      case 'gauge':
        return GaugeChartComponent;
      case 'bar':
        return HorizontalBarChartComponent;
      case 'donut':
        return DoughnutChartComponent;
      default:
        throw new Error(`Unknown chart type: ${chartType}`);
    }
  }



resize(event: Event, item: GridsterItem): void {
  // Calculate the new ratio in real-time
  const newRatio = item.cols / item.rows;
  // If the new ratio is different from the initial ratio, adjust the cols or rows
  if (newRatio !== item['initialRatio']) {
    // Here we adjust the rows, but you can also adjust the cols if you prefer
    item.rows = item.cols / item['initialRatio'];
  }
}

// static eventStart(
//   item: GridsterItem,
//   itemComponent: GridsterItemComponentInterface,
//   event: MouseEvent
// ): void {
//   console.info('eventStart', item, itemComponent, event);
//   // Store the initial ratio of cols/rows
//   item['initialRatio'] = item.cols / item.rows;
// }

// static eventStop(
//   item: GridsterItem,
//   itemComponent: GridsterItemComponentInterface,
//   event: MouseEvent
// ): void {
//   console.info('eventStop', item, itemComponent, event);
//   // Calculate the new ratio after resizing
//   const newRatio = item.cols / item.rows;
//   // If the new ratio is different from the initial ratio, adjust the cols or rows
//   if (newRatio !== item['initialRatio']) {
//     // Here we adjust the rows, but you can also adjust the cols if you prefer
//     item.rows = item.cols / item['initialRatio'];
//   }
// }

  itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
  // Calculate the new ratio in real-time
  const newRatio = Math.round(item.cols / item.rows);

  console.log('itemResized', newRatio);
  console.log('initialRatio', item['initialRatio'])
  // If the new ratio is different from the initial ratio, adjust the cols or rows
  if (newRatio !== item['initialRatio']) {
    // Here we adjust the rows, but you can also adjust the cols if you prefer
    console.log('itemResized', Math.round(item.cols / item['initialRatio']));
    item.rows = Math.round(item.cols / item['initialRatio']);
    console.log(item)


  }
}

itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
  // This method will be called when the item is moved or resized
  console.log('itemChanged', item);
}


}
