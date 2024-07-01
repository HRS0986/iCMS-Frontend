import { Component, Input, OnInit,Injector,EventEmitter, OnChanges, SimpleChanges,Output } from '@angular/core';
// declare var $: any;
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { DateRangeService } from '../../../services/shared-date-range/date-range.service';
import { ChartsService } from '../../../services/charts.service';
import { Subscription } from 'rxjs';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { AuthenticationService } from '../../../../auth/services/authentication.service';

interface MeterItem {
  label: string;
  value: number;
  color1: string;
  color2: string;
  icon: string;
}

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  providers:[MessageService]
})
export class DoughnutChartComponent implements OnInit,OnChanges{

  @Output() deletedConfirmed: EventEmitter<void> = new EventEmitter<void>();
  @Output() hideConfirmed: EventEmitter<void> = new EventEmitter<void>();

  @Input() closable:boolean = true;
  @Input() title!: string;
  @Input() data!: any;
  @Output() changesEvent = new EventEmitter<boolean>();
  options: any;
  @Input() source!: string[];
  percentages: number[] = [];
  cacheChange: boolean = false;
  callDoughnut: any[] = [];
  emailDoughnut: any[] = [];
  socialDoughnut: any[] = [];
  DateCount:number=0;

  @Input() items: MeterItem[] = [
    { label: 'Positive', value: 50, color1: '#4CAF50', color2: '#8BC34A', icon: 'pi pi-home' },
    { label: 'Negative', value: 30, color1: '#2196F3', color2: '#03A9F4', icon: 'pi pi-sitemap' },
    { label: 'Neutral', value: 70, color1: '#FF9800', color2: '#FFC107', icon: 'pi pi-desktop' }
  ];

  @Input() id!: string;

  totalSums = { positive: 0, negative: 0, neutral: 0 };

  showDatePicker: boolean = true;
  sidebarVisible: boolean = true;
  rangeDates: Date[] | undefined;
  chartRangeDate:string[] | undefined;

  selectedCategories:any[]=[];
  categories:string[]=['email','call','social'];

  @Input() changes:boolean=false;

  selectedDateRange: string[] | undefined;
  Date:any;

  changeSource:any;

  item:MenuItem[] = [];

  private socketSubscription: Subscription | undefined;

  constructor(private http: HttpClient,
    private dateRangeService: DateRangeService,
    private chartService:ChartsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  private authService:AuthenticationService) {}

  ngOnInit() {

    this.item= [
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

    // this.itemActions = [
    //   {label: 'Delete', icon: 'pi pi-trash', command: (event) => console.log('Delete', event)},
    //   {label: 'Edit', icon: 'pi pi-pencil', command: (event) => console.log('Edit', event)}
    // ]


    this.categories=this.source;
    this.selectedCategories=this.source;
    // if(this.selectedCategories){
    //   this.doughnutExtract(this.selectedCategories);
    // }

    timer(0,1000).subscribe(() => {
      if(this.changes){
        this.doughnutExtract(this.selectedCategories);
        this.changes=false;
      }
    });

    // this.socketSubscription = this.chartService.messages$.subscribe(
    //   message => {
    //     if (message.response === 'data') {
    //       if(this.source){
    //         this.doughnutExtract(this.source);
    //       }
    //     }
    //   }
    // );

    this.dateRangeService.currentDateRange.subscribe(range => {
      if (range && range.length === 2 && range[0] && range[1]) {
        this.selectedDateRange = range.map(date => this.formatDate(date));
        this.rangeDates=range;
        this.Date = null;
        if(this.selectedCategories){
          this.doughnutExtract(this.selectedCategories);
        }

      } else if(range && range.length === 2 && range[0]){
        this.selectedDateRange = undefined;
        this.rangeDates=undefined;
        this.Date = this.formatDate(range[0]);
        if(this.selectedCategories){
          this.doughnutExtract(this.selectedCategories);
        }
      }
      else{
        if(this.selectedCategories){
          this.doughnutExtract(this.selectedCategories);
        }
      }
    });
  }
  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        // this.chartService.gridDeleted(this.id).subscribe((response)=>{});
        this.messageService.add({severity:'danger', summary:'Confirmed', detail:'Item deleted'});
      },
      reject: () => {
        // Confirmation rejected
        this.messageService.add({severity:'info', summary:'Rejected', detail:'Item not deleted'});
      }
    });
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
  onDateRangeChange() {
    if (this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0] && this.rangeDates[1]) {
      this.selectedDateRange = this.rangeDates.map(date => this.formatDate(date));

      this.Date = null;
      if(this.selectedCategories){
        this.doughnutExtract(this.selectedCategories);
      }

    } else if(this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0]){
      this.selectedDateRange = undefined;
      this.Date = this.formatDate(this.rangeDates[0]);
      if(this.selectedCategories){
        this.doughnutExtract(this.selectedCategories);
      }

    }

  }

  dateReset(){
    this.rangeDates=undefined;
    this.selectedDateRange=undefined;
    this.doughnutExtract(this.selectedCategories);
  }

  onSourceChange(category:any){
    if(this.selectedCategories[0]!=null){
      this.doughnutExtract(this.selectedCategories);
    }
    else{
      this.selectedCategories=this.source;
      this.doughnutExtract(this.selectedCategories);
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

  doughnutExtract(sources: string[]): void {
    caches.open('all-data').then(cache => {
      cache.match('data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            sources.forEach(source => {
              if (source === 'call') {
                this.callDoughnut = data.flatMap((item: any) =>
                  item.call.filter((callItem: any) => this.isDateInRange(callItem.Date)).map((callItem: any) => callItem.data)
                );
              }
              if (source === 'email') {
                this.emailDoughnut = data.flatMap((item: any) =>
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date)).map((emailItem: any) => emailItem.data)
                );
              }
              if (source === 'social') {
                this.socialDoughnut = data.flatMap((item: any) =>
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date)).map((socialItem: any) => socialItem.data)
                );
              }
            });

            this.sumDoughnutData(this.callDoughnut, this.emailDoughnut, this.socialDoughnut, sources);
          });
        }
        // else {
        //   console.log('Data not found in cache');
        // }
      });
    });
  }

  isDateInRange(dateStr: string): boolean {
    if(this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0] && this.rangeDates[1])
      {
        if (!this.rangeDates || this.rangeDates.length !== 2) {
          return false;
        }
        const date = new Date(dateStr);
        const startDate = new Date(this.rangeDates[0]);
        const endDate = new Date(this.rangeDates[1]);
        return date >= startDate && date <= endDate;
      }
    else if(this.Date){
      const date = new Date(dateStr);
      const currentDate = new Date(this.Date);
      return date >= currentDate && date <= currentDate;
    }
    else if(!this.rangeDates)
      {
        return true;
      }
    return false;

  }

  sumDoughnutData(callData: any[], emailData: any[], socialData: any[], sources: string[]) {
    this.totalSums = { positive: 0, negative: 0, neutral: 0 };

    const sumData = (dataArray: any[]) => {
      dataArray.forEach((item: any) => {
        item.forEach((data: any) => {
          if (data && data.Sentiment) {
            Object.keys(data.Sentiment).forEach((key) => {
              const sentimentScore = data.Sentiment[key];
              if (key.toLowerCase() === 'positive') {
                this.totalSums.positive += 1;
              } else if (key.toLowerCase() === 'negative') {
                this.totalSums.negative += 1;
              } else if (key.toLowerCase() === 'neutral') {
                this.totalSums.neutral += 1;
              }
            });
          }
        });
      });
    };

    sources.forEach(source => {
      if (source === 'call') {
        sumData(callData);
      }
      if (source === 'email') {
        sumData(emailData);
      }
      if (source === 'social') {
        sumData(socialData);
      }
    });

    this.percentages = [
      this.totalSums.negative,
      this.totalSums.positive,
      this.totalSums.neutral
    ];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: ['Negative', 'Positive', 'Neutral'],
      datasets: [
        {
          data: this.percentages,
          backgroundColor: [
            documentStyle.getPropertyValue('--negative-color'),
            documentStyle.getPropertyValue('--positive-color'),
            documentStyle.getPropertyValue('--neutral-color')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--yellow-400')
          ]
        }
      ]
    };
  }
}
