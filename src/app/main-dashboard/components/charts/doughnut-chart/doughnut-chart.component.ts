import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { DateRangeService } from '../../../services/shared/date-range.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  data: any;
  options: any;
  @Input() source!: string[];
  percentages: number[] = [];
  cacheChange: boolean = false;
  callDoughnut: any[] = [];
  emailDoughnut: any[] = [];
  socialDoughnut: any[] = [];
  DateCount:number=0;

  selectedDateRange: string[] | undefined;
  Date:any;

  constructor(private http: HttpClient,private dateRangeService: DateRangeService) {}

  ngOnInit() {
    
    // this.doughnutExtract(this.source);
    // this.dateRangeService.currentDateRange.subscribe(range => {
    //   if (range && range.length === 2 && range[0] && range[1]) {
    //     this.selectedDateRange = range.map(date => this.formatDate(date));
    //     this.Date = null;
    //     this.doughnutExtract(this.source);
    //     console.log('Selected Date Range:', this.selectedDateRange);
    //   } else if(range && range.length === 2 && range[0]){
    //     this.selectedDateRange = undefined;
    //     this.Date = this.formatDate(range[0]);
    //     this.doughnutExtract(this.source);
    //     console.log('Incomplete Date Range:',this.Date );
    //   }
    // });
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
            console.log(data);
            sources.forEach(source => {
              if (source === 'call') {
                this.callDoughnut = data.flatMap((item: any) => 
                  item.call.filter((callItem: any) => this.isDateInRange(callItem.Date)).map((callItem: any) => callItem.Sentiment)
                );
              }
              if (source === 'email') {
                this.emailDoughnut = data.flatMap((item: any) => 
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date)).map((emailItem: any) => emailItem.Sentiment)
                );
              }
              if (source === 'social') {
                this.socialDoughnut = data.flatMap((item: any) => 
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date)).map((socialItem: any) => socialItem.Sentiment)
                );
              }
            });

            this.sumDoughnutData(this.callDoughnut, this.emailDoughnut, this.socialDoughnut, sources);
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
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

  sumDoughnutData(callData: any[], emailData: any[], socialData: any[], sources: string[]) {
    const totalSums = { positive: 0, negative: 0, neutral: 0 };
    const sumData = (dataArray: any[]) => {
      dataArray.forEach(data => {
        totalSums.positive += data.positive;
        totalSums.negative += data.negative;
        totalSums.neutral += data.neutral;
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

    this.percentages = [totalSums.negative, totalSums.positive, totalSums.neutral];
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
            documentStyle.getPropertyValue('--neutral-color'),
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
