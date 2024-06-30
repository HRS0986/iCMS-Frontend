import {  Component, Input, OnInit,EventEmitter, OnChanges, SimpleChanges,Output } from '@angular/core';
import { DateRangeService } from '../../../services/shared-date-range/date-range.service';
import { ChartsService } from '../../../services/charts.service';
import { timer } from 'rxjs';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})
export class HorizontalBarChartComponent implements OnInit,OnChanges{

  @Output() deletedConfirmed: EventEmitter<void> = new EventEmitter<void>();
  @Output() hideConfirmed: EventEmitter<void> = new EventEmitter<void>();

  data:any;
  @Input() persentages: any[]=[];
  @Input() persentages1: any[]=[];
  @Input() persentages2: any[]=[];
  @Input() persentages3: any[]=[];

  options: any;
  @Output() changesEvent = new EventEmitter<boolean>();

  @Input() topics: string[] = [];
  @Input() sources: string[] = ['call', 'email', 'social'];
  @Input() closable:boolean = true;

  labels: string[] = [];
  total: number = 0;

  datasets:any[]=[];
  callCount: string[] = [];
  emailCount: string[] = [];
  socialCount: string[] = [];

  allDataTpoic: { [key: string]: { positive: number; negative: number; neutral: number } } = {};
  allData: { [key: string]: { counts: number} } = {};


  @Input() title!: any;
  @Input() source!: string[];
  @Input() changes:boolean=false;

  selectedCategories:any[]=[];
  categories:string[]=['email','call','social'];

  @Input() yAxis!: any;
  @Input() xAxis!: any;

  selectedDateRange: string[] | undefined;
  Date:any;

  items: MenuItem[] = [];

  chartCategory:string='topic';

  constructor(private dateRangeService: DateRangeService,private chartService: ChartsService,
private authService:AuthenticationService
  ){}

  ngOnInit() {

    this.items= [
      {
        icon: 'pi pi-ellipsis-v',
        items: [
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this['onDelete']();
            }
          },
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {
              this['onEdit']();
            }
          },
          {
            label: 'Hide',
            icon: 'pi pi-eye-slash',
            command: () => {
              this['confirmDeleted']();
            }
          }

          
        ]
      }

  ];

    this.categories=this.source;
    this.selectedCategories=this.source;
    
    timer(0,1000).subscribe(() => {
      if(this.changes){
          this.barChartExtract(this.selectedCategories);
        this.changes=false;
      }
    });

    this.dateRangeService.currentDateRange.subscribe(range => {
      if (range && range.length === 2 && range[0] && range[1]) {
        this.selectedDateRange = range.map(date => this.formatDate(date));
        this.Date = null;
        if(this.selectedCategories){

          this.barChartExtract(this.selectedCategories);
        }
      } else if(range && range.length === 2 && range[0]){
        this.selectedDateRange = undefined;
        this.Date = this.formatDate(range[0]);
        if(this.selectedCategories){

          this.barChartExtract(this.selectedCategories);
        }
      }
      else{
        if(this.selectedCategories){

          this.barChartExtract(this.selectedCategories);
        }
      }
    });

    this.chart();

  }

  
  onDelete(){
    console.log('delete');
    this.deletedConfirmed.emit();
  }

  onEdit(){
    console.log('Edit');
  }

 confirmDeleted() {
        console.log('confirm button');
        this.hideConfirmed.emit();
  }

  onSourceChange(category:any){
    if(this.selectedCategories[0]!=null){
      this.barChartExtract(this.selectedCategories);
    }
    else{
      this.selectedCategories=this.source;
      this.barChartExtract(this.selectedCategories);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['changes'] && changes['changes'].currentValue === true) {
      // Defer the method execution until after the view has been checked
      setTimeout(() => {
        this.chartDataGet();
        this.changesEvent.emit(false); // Reset the changes flag to false
      });
    }
  }


  chartDataGet(): void {
    this.authService.getIdToken().subscribe((token) =>{
    this.chartService.chartData(token).subscribe(
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
        this.changes=true;
      },
      // (error) => {
      //   console.error('Error fetching doughnut chart data:', error);
      // }
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

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    const parts = formattedDate.split(', ');

    // Format the date to remove the comma and ensure spacing
    const formattedDateString = `${parts[0]} ${parts[1]} ${parts[2]}`;
    return formattedDateString;
  }

  barChartExtract(sources: string[]): void {
    this.datasets = [];
    this.labels = [];
    this.allDataTpoic = {};
    this.allData={};

    caches.open('all-data').then(cache => {
      cache.match('data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            const documentStyle = getComputedStyle(document.documentElement);
            const allTopics: string[] = [];

            sources.forEach(source => {
              let callTopics: any[] = [];
              let emailTopics: any[] = [];

              if (source === 'call') {
                callTopics = this.extractTopics(data, 'call');
                allTopics.push(...callTopics);
              }

              if (source === 'email') {
                emailTopics = this.extractTopics(data, 'email');
                allTopics.push(...emailTopics);
              }

              if (source === 'social') {
                emailTopics = this.extractTopics(data, 'social');
                allTopics.push(...emailTopics);
              }
            });

            // Create a set to get distinct topics
            this.topics = [...new Set(allTopics)];
            console.log(this.topics);
            sources.forEach(source => {
              let sourceData: any[] = [];

              if (source === 'call') {
                this.callCount = this.extractCounts(data, 'call');
                sourceData = this.aggregateWordCloudData(this.callCount, this.topics);
              }

              if (source === 'email') {
                this.emailCount = this.extractCounts(data, 'email');
                sourceData = this.aggregateWordCloudData(this.emailCount, this.topics);
              }
              if (source === 'social') {
                this.socialCount = this.extractCounts(data, 'social');
                sourceData = this.aggregateWordCloudData(this.socialCount, this.topics);
              }

              if (sourceData) {
                this.updateAllData(this.transformData(sourceData));
              }
            });

            this.createDatasets(documentStyle);

            this.labels = this.topics; // Update labels based on dynamic topics

            this.chart();
          });
        }
      });
    });
  }

maxPositive:any[]=[];
maxNegative:any[]=[];
maxPositiveIndex:any;
maxNegativeIndex :any;

getMaxValues(response: any) {
  this.maxPositive=[];
  this.maxNegative=[];
  const counts = response.data;

  // Sorting negative data
  const sortedNegativeData = [...counts].sort((a, b) => b - a);

  // Logging sorted negative values and their corresponding indices
  sortedNegativeData.forEach(value => {
    const index = counts.indexOf(value);
    this.maxNegative.push(this.labels[index]);
  });
}




transformData(data: any[]): { [key: string]: { count: number, percentage: number } } {
  const transformedData: { [key: string]: { count: number, percentage: number } } = {};
  data.forEach(item => {
    transformedData[item.category] = {
      count: item.count,
      percentage: item.percentage
    };
  });
  return transformedData;
}

updateAllData(sourceData: any): void {
    Object.keys(sourceData).forEach(topic => {
      if (!this.allData[topic]) {
        this.allData[topic] = { counts: 0};
      }
      this.allData[topic].counts += sourceData[topic].count;
    });

}


createDatasets(documentStyle: CSSStyleDeclaration): void {
  this.datasets = [];
  this.datasets.push({
    label: 'Counts',
    backgroundColor: documentStyle.getPropertyValue('--blue-color'),
    data: this.topics.map(topic => this.allData[topic]?.counts || 0)
  });

}

extractTopics(data: any, sourceType: string): any[] {
  return data.flatMap((item: any) =>
    item[sourceType]
      .filter((sourceItem: any) => this.isDateInRange(sourceItem.Date))
      .flatMap((sourceItem: any) => {
        if (this.xAxis === 'topics') {
          return sourceItem.data.flatMap((dataItem: any) => dataItem.topic);
        } else if (this.xAxis === 'keywords') {
          return sourceItem.data.flatMap((dataItem: any) => dataItem.keywords);
        } else if (this.xAxis === 'products') {
          return sourceItem.data.flatMap((dataItem: any) => dataItem.products);
        }else {
          return [];
        }
      }).filter((element: any) => element != null)
  );
}

extractCounts(data: any, sourceType: string): any[] {
  return data.flatMap((item: any) =>
    item[sourceType]
      .filter((sourceItem: any) => this.isDateInRange(sourceItem.Date))
      .flatMap((sourceItem: any) => sourceItem.data)
      .filter((element: any) => element != null)
  );
}

aggregateWordCloudData(allCount: any, topics: string[]): any {

  this.total = 0;
  const categoryMapCount: { [topic: string]: number } = {};

  topics.forEach(topic => {
      categoryMapCount[topic] = 0;
  });

  allCount.forEach((item: any) => {
    if (item.Sentiment) {
      let itemTopics: any[] = [];

      if (this.xAxis === 'topics') {
        itemTopics = Array.isArray(item.topic) ? item.topic : (item.topic ? [item.topic] : []);
      } else if (this.xAxis === 'products') {
        itemTopics = Array.isArray(item.products) ? item.products : (item.products ? [item.products] : []);
      }else if (this.xAxis === 'keywords') {
        itemTopics = Array.isArray(item.keywords) ? item.keywords : (item.keywords ? [item.keywords] : []);
      }

      if (itemTopics.some((topic: any) => topics.includes(topic))) {
        this.total += 1;

        itemTopics.forEach((topic: string) => {
          if (topics.includes(topic)) {
            categoryMapCount[topic] += 1;

          }
        });
      }
    }
  });

    const countsData = topics.map(topic => ({
      category: topic,
      count: categoryMapCount[topic],
      percentage: parseFloat(((categoryMapCount[topic] / this.total) * 100).toFixed(2))
    }));

    return countsData;

}


  isDateInRange(dateStr: string): boolean {
    if(this.selectedDateRange && this.selectedDateRange.length === 2 && this.selectedDateRange[0] && this.selectedDateRange[1])
      {
        if (!this.selectedDateRange || this.selectedDateRange.length !== 2) {
          return false;
        }
        const date = new Date(dateStr);
        const startDate = new Date(this.selectedDateRange[0]);
        const endDate = new Date(this.selectedDateRange[1]);
        return date >= startDate && date <= endDate;
      }
    else if(this.Date){
      const date = new Date(dateStr);
      const currentDate = new Date(this.Date);
      return date >= currentDate && date <= currentDate;
    }
    else if(!this.selectedDateRange)
      {
        return true;
      }
    return false;

  }

  chart(){

    console.log(this.datasets);
    const documentStyle = getComputedStyle(document.documentElement);
    // const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: this.labels,
      datasets: this.datasets
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Medium'
          }
        }
      },
      plugins: {
        legend: {
          display: true
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
          formatter: (value: number) => `${value}%`,
          color: '#000',
          font: {
            weight: 'bold',
            size: 12
          }
        }
      },
    };
  }
}
