import {Component, Input, OnInit,Injector,ViewChild} from '@angular/core';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import { DisplayGrid, Draggable, PushDirections, Resizable, GridType} from 'angular-gridster2';
import { ChartData, ChartOptions } from 'chart.js';
import {LineAreaChartComponent} from "../charts/line-area-chart/line-area-chart.component";
import {GaugeChartComponent} from "../charts/gauge-chart/gauge-chart.component";
import {HorizontalBarChartComponent} from "../charts/horizontal-bar-chart/horizontal-bar-chart.component";
import {DoughnutChartComponent} from "../charts/doughnut-chart/doughnut-chart.component";
import { WordcloudComponent } from '../charts/wordcloud/word-cloud.component';
import { ChartsService } from '../../services/charts.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import {MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { GridsterItemComponentInterface } from 'angular-gridster2';

interface Product {
  id: number;
  title: string;
  chart: string;
  price: number;
  category: string;
}

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


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})

export class GridComponent implements OnInit {

  chartIcons: { [key: string]: string } = {
    'Bar Chart': 'pi pi-chart-bar', // Replace with your actual paths
    'Line Chart': 'pi pi-chart-line',
    'Pie Chart': 'pi pi-chart-pie',
    'Table': 'pi pi-table',
    'Horizontal Bar Chart': 'pi pi-chart-bar rotate-90',
    'Word Cloud': 'pi pi-slack',
};

  products: Product[] = []; // Initialize with your products
  selectedProduct: Product | null = null;
  selectedDashboard: Widget | null = null;

  private changesQueue: any[] = [];
  private timeoutId: any;
  gridStart:number = 0;

  @ViewChild(DoughnutChartComponent) doughnutComponent!: DoughnutChartComponent;
  @ViewChild(LineAreaChartComponent) lineAreaComponent!: LineAreaChartComponent;
  @ViewChild(WordcloudComponent) wordCloudComponent!: WordcloudComponent;

  options!: Safe;
  dashboard!: Array<GridsterItem>;

  gridList!:Array<GridsterItem>;

  data!: ChartData;
  chartOptions!: ChartOptions;

  ID:any;

  xAxis:string[]=[];
  yAxis:string[]=[];
  topic:string[]=[];
  status:string[]=[];
  widgetTitle: any;
  widgetChart: any;
  widgetSoucrce: any;
  widgetGrid:any;

  ChartSources:any;

  menuItems: any[] = [];

  widgetData:any;

  @Input() userChartInfo: {
    chartType: string,
    data: ChartData,
    options: ChartOptions
  }[] = [];


  @Input() changes: boolean=false;

  private socketSubscription: Subscription | undefined;

  constructor(private injector: Injector,
    private ChartService: ChartsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ,private authService:AuthenticationService
    ) {}
  ngOnInit(): void {
    this.menuItems = [
        {
          label: 'Settings',
          command: () => console.log('Settings')
        },
        {
          label: 'Another Action',
          command: () => console.log('Another Action')
        },
        // add more menu items here
      ];
    this.gridStart = 0;
    this.widgetsUser();

    timer(0,1000).subscribe(() => {
        if(this.changes){
          this.widgetsUser();
          this.changes=false;
        }
    });

    this.socketSubscription = this.ChartService.messages$.subscribe(
      message => {
        if (message.response === 'data') {
          this.chartDataGet();
          this.dashboard.forEach((widget:any) => {
            if (widget.chartType === 'Pie Chart' && widget.sources.includes(message.name)) {
              widget.changes = true;
            }
            if (widget.chartType === 'Bar Chart' && widget.sources.includes(message.name)) {
              widget.changes = true;

            }
            if (widget.chartType === 'Line Chart' && widget.sources.includes(message.name)) {
              widget.changes = true;

            }
            if (widget.chartType === 'Word Cloud' && widget.sources.includes(message.name)) {
              widget.changes = true;
            }

          });

        }
      }
    );
    this.grid();
    this.gridStart=1;
}

onRowSelect(event: any, op: any) {
  op.hide();
}

addItem() {
  // Implement your add item logic here
}

showOverlay(op: any): void {
  op.toggle(event);
}

removeItem($event: MouseEvent | TouchEvent, item:any): void {
  this.gridDeleteConfirmed(item,item.title);
}

addChart($event: MouseEvent | TouchEvent, item:any): void {
  $event.preventDefault();
  $event.stopPropagation();
  console.log(item.id);
  this.gridList.splice(this.gridList.indexOf(item), 1);
  this.dashboard.push(item);
  this.saveStatus(item,'show');
}

saveStatus(item:any,status:string){
  this.authService.getIdToken().subscribe((token) =>{
    this.ChartService.saveGridStatus(token,item.id,status).subscribe(
      response => {
        // console.log('Grid layout saved successfully:', response);
      },
      error => {
        // console.error('Error saving grid layout:', error);
      }
    );
  });
  }

  saveLayout(change:any): void {
    this.authService.getIdToken().subscribe((token) =>{
    this.ChartService.saveGridLayout(token,change).subscribe(
      response => {
        // console.log('Grid layout saved successfully:', response);
      },
      error => {
        // console.error('Error saving grid layout:', error);
      }
    );
  });
  }

onDeleteConfirmed(item:any) {
  item.status='hide';
  this.dashboard.splice(this.dashboard.indexOf(item), 1);
  this.gridList.push(item);
  this.saveStatus(item,'hide');
}

gridDeleteConfirmed(id:any,title:string) {
  this.confirmationService.confirm({
    message: `Are you sure that you want to delete ${title} grid?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.authService.getIdToken().subscribe((token) =>{
      this.ChartService.gridDeleted(id,token).subscribe(
        response => {
          if(response!=false){
            this.dashboard.splice(this.dashboard.indexOf(id), 1);
            this.gridList.splice(this.gridList.indexOf(id), 1);
            this.showMessage("Grid Deleted");
          }

        },
      );
    });

    },
    reject: () => {
      // Logic for rejection (optional)
    }
  });

}




showMessage(detail: string) {
  this.messageService.add({ severity: 'error', summary: 'Deleted', detail: detail });
}


chartDataGet(): void {
  this.authService.getIdToken().subscribe((token) =>{
  this.ChartService.chartData(token).subscribe(
    (response) => {
      caches.open('all-data').then(cache => {
        cache.match('data').then((cachedResponse) => {
          if (cachedResponse) {
            cachedResponse.json().then((cachedData: any) => {
  
              if (!this.isEqual(response, cachedData)) {

                const dataResponse = new Response(JSON.stringify(response), {
                  headers: { 'Content-Type': 'application/json' }
                });
                cache.put('data', dataResponse);
              }
            });
          } else {

            const dataResponse = new Response(JSON.stringify(response), {
              headers: { 'Content-Type': 'application/json' }
            });
            cache.put('data', dataResponse);
          }
        });
      });
    },
  );
  });
}

isEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      return false;
    }
  }
  return true;
}

onChanges(event: boolean, index: number): void {

}



grid(){
  this.options = {
    gridType: GridType.ScrollVertical,
    compactType: "compactUp",
    // margin: 10,
    // outerMargin: true,
    // outerMarginTop: null,
    // outerMarginRight: null,
    // outerMarginBottom: null,

    // min/max cols/rows in grid
    minCols: 7,
    maxCols: 7,

    minRows: 6,
    maxRows: 80,

    // min/max item cols/rows
    maxItemCols: 6,
    maxItemRows: 6,

    minItemCols: 2,
    minItemRows: 2,

    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 20,
    fixedRowHeight: 10,
    scrollSensitivity: 10,
    scrollSpeed: 8,
    draggable: {
      enabled: true,
      dropOverItems:false
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
      },
    },
    swap: true,
    pushItems: true,
    swapWhileDragging: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    // enableBoundaryControl:true,
    pushDirections: {north: true, east: true, south: true, west: true},
    pushResizeItems: false,
    displayGrid: DisplayGrid.OnDragAndResize,
    disableAutoPositionOnConflict:false,
    // disableWindowResize:false,
    disableWarnings: true,
    scrollToNewItems: true,
    // setGridSize:false,
    disableScrollHorizontal:true,

    //janith
    setGridSize: true,
    margin:20,
    itemChangeCallback: this.itemChange.bind(this),
  };

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
        cachedResponse.json().then((data: any[]) => { // Ensure data is typed as array
          this.widgetTitle = data.map((item: any) => item.title);
          this.widgetChart = data.map((item: any) => item.chartType);
          this.widgetSoucrce = data.map((item: any) => item.sources);
          this.yAxis = data.map((item: any) => item.yAxis);
          this.xAxis = data.map((item: any) => item.xAxis);
          this.topic = data.map((item: any) => item.topics);
          this.widgetGrid = data.map((item: any) => item.grid);
          this.ID = data.map((item: any) => item.id);
          this.status = data.map((item: any) => item.status);
          console.log(data);
          // this.widgetData = this.processWidgetData(this.widgetTitle, this.widgetChart, this.widgetSoucrce);
          const response = this.processGridData(this.widgetTitle, this.widgetChart, this.widgetSoucrce, this.widgetGrid,this.ID,this.topic,this.yAxis,this.xAxis,this.status);
          this.dashboard= response[0].filter((item:any) => item['status'] !== 'hide');
          console.log(this.dashboard);
          this.gridList = response[0].filter((item:any) => item['status'] !== 'show');
          this.ChartSources=response[1];
        });
      }
      // } else {
      //   console.log('Data not found in cache');
      // }
    });
  });
}

  onresize(event: any): void {
    console.log('Element was resized', event);
  }




processGridData(titles: string[], chartTypes: string[], sources: any[], grids: any[],ids:any[],topic:any[],yAxis:any[],xAxis:any[],status:any[]): any[] {
  const datasetList: any[] = [];
  const changedList: { [key: string]: string[] } = {};
  const validSources = ['email', 'call', 'social'];

  titles.forEach((title, index) => {
    const source = sources[index];
    const grid = grids[index];
    const chartType = chartTypes[index];
    const id = ids[index];

    // Create a dataset object
    const dataset = {
      key: grid.key,
      cols: grid.cols,
      rows: grid.rows,
      y: grid.y,
      x: grid.x,
      chartType: chartType,
      sources: source,
      title,
      changes:false,
      id:id,
      yAxis:yAxis[index],
      xAxis:xAxis[index],
      topics:topic[index],
      status:status[index]
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
    item.rows = Math.round(item.cols / item['initialRatio']);
  }
}

itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
  // This method will be called when the item is moved or resized

  console.log(item);
  if (item && this.gridStart==1){
    const change = {
      id: item["id"],   // Assuming item.key is the unique identifier
      cols: item.cols,
      rows: item.rows,
      x: item.x,
      y: item.y
      // Add other properties as needed
    };

    const existingChangeIndex = this.changesQueue.findIndex(c => c.id === change.id);
    if (existingChangeIndex !== -1) {
      this.changesQueue[existingChangeIndex] = change;
    } else {
      this.changesQueue.push(change);
    }

    // Debounce or delay sending changes to backend for efficiency
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.saveLayout(this.changesQueue);
      this.updateCache(this.changesQueue);
    }, 1000);

    
  }
}

updateCache(changesQueue: { id: string, cols: number, rows: number, x: number, y: number }[]): void {
  caches.open('widgets').then(cache => {
    cache.match('widgets-data').then(cachedResponse => {
      if (cachedResponse) {
        cachedResponse.json().then((data: any[]) => {
          changesQueue.forEach(change => {
            const index = data.findIndex(item => item.id === change.id);
            if (index !== -1) {
              data[index].grid.cols = change.cols;
              data[index].grid.rows = change.rows;
              data[index].grid.x = change.x;
              data[index].grid.y = change.y;
            }
          });

          const updatedResponse = new Response(JSON.stringify(data));
          cache.put('widgets-data', updatedResponse);
          console.log(data);
        });
      }
    });
  });
}
  openSettings(item: any) {
  // Open the settings dialog for the clicked grid item
  // ...
}




}
