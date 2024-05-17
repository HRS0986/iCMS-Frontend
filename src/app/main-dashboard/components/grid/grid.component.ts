import { Component,OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { DisplayGrid, Draggable, PushDirections, Resizable} from 'angular-gridster2';
import { ChartData, ChartOptions } from 'chart.js';

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

  ngOnInit(): void {
    this.options = {
      gridType: "scrollVertical",
      compactType: "compactUp&Left",
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      // outerMarginLeft: null,
      // useTransformPositioning: true,
      // mobileBreakpoint: 640,
      // useCssTransforms: true,
      // useBodyForBreakpoint: false,
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
      // keepFixedHeightInMobile: false,
      // keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 8,
      // enableEmptyCellClick: false,
      // enableEmptyCellContextMenu: false,
      // enableEmptyCellDrop: false,
      // enableEmptyCellDrag: false,
      // enableOccupiedCellDrop: false,
      // emptyCellDragMaxCols: 50,
      // emptyCellDragMaxRows: 50,
      // ignoreMarginInRow: false,
      draggable: {
        enabled: true,

      },
      resizable: {
        enabled: true,
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
      setGridSize:false,
      disableScrollHorizontal:true,
    };

    this.dashboard = [
      {key:1, cols: 2, rows: 1, y: 0, x: 0, },
      {key:2, cols: 2, rows: 2, y: 0, x: 2, hasContent: true},
      {key:3, cols: 1, rows: 1, y: 0, x: 4},
      {key:4, cols: 1, rows: 1, y: 2, x: 5},
      {key:5, cols: 1, rows: 1, y: 1, x: 0},
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

  // changedOptions(): void {
  //   if (this.options.api && this.options.api.optionsChanged) {
  //     this.options.api.optionsChanged();
  //   }
  // }

  removeItem($event: MouseEvent | TouchEvent, item:any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }






}





















