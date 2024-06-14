import {Component, Input, OnInit,Injector,ViewChild} from '@angular/core';
import {GridsterConfig, GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import { DisplayGrid, Draggable, PushDirections, Resizable} from 'angular-gridster2';
import { ChartData, ChartOptions } from 'chart.js';
import {LineAreaChartComponent} from "../charts/line-area-chart/line-area-chart.component";
import {GaugeChartComponent} from "../charts/gauge-chart/gauge-chart.component";
import {HorizontalBarChartComponent} from "../charts/horizontal-bar-chart/horizontal-bar-chart.component";
import {DoughnutChartComponent} from "../charts/doughnut-chart/doughnut-chart.component";
import { WordcloudComponent } from '../charts/wordcloud/word-cloud.component';
import { ChartsService } from '../../services/charts.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

interface Widget {
  key: number;
  cols: number;
  rows: number;
  y: number;
  x: number;
  chartType: string;
  initialRatio: number;
  sources: string[];
  title: string;
  changes: boolean;
}

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

  @ViewChild(DoughnutChartComponent) doughnutComponent!: DoughnutChartComponent;
  @ViewChild(LineAreaChartComponent) lineAreaComponent!: LineAreaChartComponent;
  @ViewChild(WordcloudComponent) wordCloudComponent!: WordcloudComponent;

  options!: Safe;
  dashboard!: Array<GridsterItem>;

  data!: ChartData;
  chartOptions!: ChartOptions;

  ID:any;

  widgetTitle: any;
  widgetChart: any;
  widgetSoucrce: any;
  widgetGrid:any;

  ChartSources:any;

  widgetData:any;

  @Input() userChartInfo!: any;
  @Input() changes: boolean=false;
  
  private socketSubscription: Subscription | undefined;

  constructor(private injector: Injector,
    private ChartService: ChartsService,
    ) {}
  ngOnInit(): void {
    this.widgetsUser();
    
    timer(0,1000).subscribe(() => {
        if(this.changes){
          console.log('grid work');
          this.widgetsUser();
          this.changes=false;
        }
    });

    this.socketSubscription = this.ChartService.messages$.subscribe(
      message => {
        console.log(message);
        if (message.response === 'data') {
          this.dashboard.forEach((widget:any) => {
            console.log(widget);
            if (widget.chartType === 'Pie Chart' && widget.sources.includes(message.name)) {
              widget.changes = true;
              console.log('changed flg pie');
            }
            if (widget.chartType === 'Bar Chart' && widget.sources.includes(message.name)) {
              widget.changes = true;
              console.log('changed flg bar');
            }
            if (widget.chartType === 'Line Chart' && widget.sources.includes(message.name)) {
              widget.changes = true;
              console.log('changed flg line');
            }
            if (widget.chartType === 'Word Cloud' && widget.sources.includes(message.name)) {
              widget.changes = true;
              console.log('changed flg word');
            }
            
          });
    
          // Optionally, log the updated widgetData to verify changes


          // // this.doughnutComponent.changes=true;
          // // this.doughnutComponent.refresh(message.name);
          // if (this.widgetChart.includes('pie-chart')){
          //   this.doughnutComponent.changes=true;
          //   this.doughnutComponent.refresh(message.name);
          // }
          // // if (this.widgetChart.includes('line-chart')){
          //   this.lineAreaComponent.changes=true;
          //   this.lineAreaComponent.refresh(message.name);
          // // }
          // // if (this.widgetChart.includes('word-cloud')){
          //   this.wordCloudComponent.changes=true;
          //   this.wordCloudComponent.refresh(message.name);
          // // }

        }
      }
    );
    // console.log(this.userChartInfo);
    this.grid();
}



chartDataGet(): void {
  this.ChartService.chartData().subscribe(
    (response) => {      
      caches.open('all-data').then(cache => {
        cache.match('data').then((cachedResponse) => {
          if (cachedResponse) {
            cachedResponse.json().then((cachedData: any) => {
              // Compare the response with the cached data
              if (!this.isEqual(response, cachedData)) {
                // Update only the changed data in the cache
                // const updatedData = { ...cachedData, ...response };
                const dataResponse = new Response(JSON.stringify(response), {
                  headers: { 'Content-Type': 'application/json' }
                });
                cache.put('data', dataResponse);
                // this.DataCacheChange = true;
              }
            });
          } else {
            // Cache the response if no cached data exists
            const dataResponse = new Response(JSON.stringify(response), {
              headers: { 'Content-Type': 'application/json' }
            });
            cache.put('data', dataResponse);
          }
        });
      });
    },
    (error) => {
      console.error('Error fetching doughnut chart data:', error);
    } 
  );
}

isEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      console.log(`${key} values are different`);
      return false;
    }
  }
  return true;
}

onChanges(event: boolean, index: number): void {
  console.log("in grid chnage");
  if (event === false) {
    this.dashboard[index]['changes'] = false;
  }
}


grid(){
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

  // this.dashboard = [
  //   {key:1, cols: 5, rows: 3, y: 0, x: 0, chartType: 'line-chart', initialRatio: Math.round(5/3)},
  //   {key:2, cols: 2, rows: 3, y: 0, x: 2, chartType: 'gauge',initialRatio: Math.round(2/2)},
  //   {key:3, cols: 5, rows: 3, y: 0, x: 4, chartType: 'pie-chart', initialRatio: Math.round(2/2)},
  //   {key:4, cols: 5, rows: 3, y: 1, x: 0, chartType: 'word-cloud', initialRatio: Math.round(2/2)},
  // ];

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

widgetsUser(){
  caches.open('widgets').then(cache => {
    cache.match('widgets-data').then(cachedResponse => {
      if (cachedResponse) {
        cachedResponse.json().then(data => {
          console.log(data);
          this.widgetTitle = data.map((item: any) => item.title);
          this.widgetChart = data.map((item: any) => item.chartType);
          this.widgetSoucrce = data.map((item: any) => item.sources);
          this.widgetGrid = data.map((item: any) => item.grid);
          this.ID = data.map((item: any) => item.id);
          // this.widgetData = this.processWidgetData(this.widgetTitle, this.widgetChart, this.widgetSoucrce);
          const response = this.processGridData(this.widgetTitle, this.widgetChart, this.widgetSoucrce, this.widgetGrid,this.ID);
          this.dashboard= response[0];
          this.ChartSources=response[1];
          console.log(this.dashboard);
          
        });
      } else {
        console.log('Data not found in cache');
      }
    });
  });
}



processGridData(titles: string[], chartTypes: string[], sources: any[], grids: any[],ids:any[]): any[] {
  const datasetList: any[] = [];
  const changedList: { [key: string]: string[] } = {};
  const validSources = ['email', 'call', 'social'];

  titles.forEach((title, index) => {
    const source = sources[index];
    const grid = grids[index];
    const chartType = chartTypes[index];
    const id = ids[index];
    // Extract valid sources from the title
    // const titleSources = source.toLowerCase().split(/[\s,-]+/).filter((word:any) => validSources.includes(word));
    // console.log(titleSources);
    // if (titleSources.length === 0) {
    //   console.warn(`Title "${title}" does not have a valid source`);
    //   return;
    // }

    // Create a dataset object
    const dataset = {
      key: grid.key,
      cols: grid.cols,
      rows: grid.rows,
      y: grid.y,
      x: grid.x,
      chartType: chartType,
      initialRatio: Math.round(grid.cols / grid.rows),
      sources: source,
      title,
      changes:false,
      id:id
    };

    datasetList.push(dataset);
    
    // Populate the changedList object
    if (!changedList[title]) {
      changedList[title] = [];
    }
    changedList[title].push(...source);
  });

  // this.ChartSources=changedList;

  return [datasetList, changedList ];
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
      case 'line-chart':
        return LineAreaChartComponent;
      case 'gauge':
        return GaugeChartComponent;
      case 'bar':
        return HorizontalBarChartComponent;
      case 'pie-chart':
        return DoughnutChartComponent;
      case 'word-cloud':
        return WordcloudComponent;
        
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
  // console.log(item);
  // console.log('itemResized', newRatio);
  // console.log('initialRatio', item['initialRatio'])
  // If the new ratio is different from the initial ratio, adjust the cols or rows
  if (newRatio !== item['initialRatio']) {
    // Here we adjust the rows, but you can also adjust the cols if you prefer
    // console.log('itemResized', Math.round(item.cols / item['initialRatio']));
    item.rows = Math.round(item.cols / item['initialRatio']);
  }
}

itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
  // This method will be called when the item is moved or resized
  console.log('itemChanged', item);
}


}
