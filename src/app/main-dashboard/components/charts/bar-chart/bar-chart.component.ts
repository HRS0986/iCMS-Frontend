import {  Component, Input, OnInit,EventEmitter, OnChanges, SimpleChanges,Output } from '@angular/core';
import { DateRangeService } from '../../../services/shared-date-range/date-range.service';
import { ChartsService } from '../../../services/charts.service';
import { timer } from 'rxjs';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import {MenuItemCommandEvent} from "primeng/api";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit,OnChanges{
  data:any;
  @Input() persentages: any=[65, 59, 80, 81, 56, 55, 40];
  @Input() persentages1: any=[65, 59, 80, 81, 56, 55, 40];
  @Input() persentages2: any=[65, 59, 80, 81, 56, 55, 40];
  @Input() persentages3: any=[65, 59, 80, 81, 56, 55, 40];
  @Input() labels: any=['Product', 'Service', 'Pricing', 'Issues', 'Website'];
  options: any;
  @Output() changesEvent = new EventEmitter<boolean>();

  datasets:any[]=[];
  callCount: string[] = [];
  emailCount: string[] = [];
  socialCount: string[] = [];

  @Input() title!: any;
  @Input() source!: string[];
  @Input() changes:boolean=false;

  selectedCategories:any[]=[];
  categories:string[]=['email','call','social'];

  selectedDateRange: string[] | undefined;
  Date:any;

  items!: any[];

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
                        command(event: MenuItemCommandEvent) {
                            console.log(event);


                        }
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-pencil',
                        command(event: MenuItemCommandEvent) {
                            console.log(event);
                        }
                    }
                ]
            }

        ];
    this.selectedCategories=this.source;
    if(this.selectedCategories){
      this.barChartExtract(this.selectedCategories);
    }

    timer(0,1000).subscribe(() => {
      if(this.changes){
          this.barChartExtract(this.selectedCategories);
          console.log("refreshed word chart");
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
        console.log('Selected Date Range:', this.selectedDateRange);
      } else if(range && range.length === 2 && range[0]){
        this.selectedDateRange = undefined;
        this.Date = this.formatDate(range[0]);
        if(this.selectedCategories){
          this.barChartExtract(this.selectedCategories);
        }
        console.log('Incomplete Date Range:',this.Date );
      }
    });

    this.chart();

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
      (error) => {
        console.error('Error fetching doughnut chart data:', error);
      }
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
        console.log(`${key} values are different`);
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
    this.datasets=[];
    caches.open('all-data').then(cache => {
      cache.match('data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            const documentStyle = getComputedStyle(document.documentElement);
            sources.forEach(source => {
              if (source === 'call') {
                this.callCount = data.flatMap((item: any) =>
                  item.call.filter((callItem: any) => this.isDateInRange(callItem.Date))
                           .flatMap((callItem: any)=> callItem.Categories)
                );
                const calldata = this.aggregateWordCloudData(this.callCount);
                this.persentages1 = Object.values(calldata).map((entry: any) => entry.percentage);

                this.datasets.push({
                  label: 'Call',
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                  ],
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: this.persentages1

                });
              }
              if (source === 'email') {
                this.emailCount = data.flatMap((item: any) =>
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date))
                            .flatMap((emailItem: any) => emailItem.Categories)
                );
                const emaildata = this.aggregateWordCloudData(this.emailCount);
                this.persentages2 = Object.values(emaildata).map((entry: any) => entry.percentage);

                this.datasets.push({
                  label: 'Email',
                  backgroundColor: [
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                  ],
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: this.persentages2
                });

              }
              if (source === 'social') {
                this.socialCount = data.flatMap((item: any) =>
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date))
                             .flatMap((socialItem: any) => socialItem.Categories)
                );

                const socialdata = this.aggregateWordCloudData(this.socialCount);
                this.persentages3 = Object.values(socialdata).map((entry: any) => entry.percentage);

                this.datasets.push({
                  label: 'Social',
                  backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                  ],
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: this.persentages3
                });
              }
            });

            const allCount = [...this.callCount, ...this.emailCount, ...this.socialCount];
            const datas = this.aggregateWordCloudData(allCount);

            this.labels = Object.values(datas).map((entry: any) => entry.category);
            this.persentages = Object.values(datas).map((entry: any) => entry.percentage);


            this.chart();
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
  }

  aggregateWordCloudData(allCount: string[]): any[] {
    const categoryMap: { [key: string]: number } = {};

    allCount.forEach(category => {
      if (categoryMap[category]) {
        categoryMap[category] += 1;
      } else {
        categoryMap[category] = 1;
      }
    });

    const total = allCount.length;

    return Object.keys(categoryMap).map(key => ({
      category: key,
      count: categoryMap[key],
      percentage: ((categoryMap[key] / total) * 100).toFixed(2) // Calculate the percentage
    }));
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
    const documentStyle = getComputedStyle(document.documentElement);
    // const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.labels,
      datasets: this.datasets
    };

    this.options = {
      indexAxis: 'x',
      maintainAspectRatio: true,
      aspectRatio: 0.5,
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
