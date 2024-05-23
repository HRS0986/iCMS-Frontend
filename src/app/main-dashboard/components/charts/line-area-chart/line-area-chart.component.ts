import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartsService } from '../../../services/charts.service';
import { timer } from 'rxjs';
import { DateRangeService } from '../../../services/shared/date-range.service';

@Component({
  selector: 'app-line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent implements OnInit {
  @Input() title!: string;
  data: any;
  options: any;
  @Input() dates!: any;
  @Input() positive!: any;
  @Input() negative!: any;
  @Input() neutral!: any;
  @Input() sources!: any;

  cacheChange: boolean = false;

  processedCallLine: any[] = [];
  processedEmailLine: any[] = [];
  processedSocialLine: any[] = [];
  combinedLine: any;

  selectedDateRange: string[] | undefined;
  Date:any;

  constructor(private http: HttpClient, private chartService: ChartsService,private dateRangeService: DateRangeService) {}

  ngOnInit() {
    // this.lineExtract(this.sources);

    // this.dateRangeService.currentDateRange.subscribe(range => {
    //   if (range && range.length === 2 && range[0] && range[1]) {
    //     this.selectedDateRange = range.map(date => this.formatDate(date));
    //     this.Date = null;
    //     this.lineExtract(this.sources);
    //     console.log('Selected Date Range:', this.selectedDateRange);
    //   } else if(range && range.length === 2 && range[0]){
    //     this.selectedDateRange = undefined;
    //     this.Date = this.formatDate(range[0]);
    //     this.lineExtract(this.sources);
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


  lineExtract(sources: string[]) {
    caches.open('all-data').then(cache => {
      cache.match('data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            const dateRange = this.selectedDateRange; // Assume selectedDateRange is set with the current date range
            
            if (dateRange && dateRange.length === 2) {
              const startDate = new Date(dateRange[0]);
              const endDate = new Date(dateRange[1]);
              const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
              
              sources.forEach(source => {
                if (source === 'call') {
                  const callLine = data.map((item: any) => item.call);
                  this.processedCallLine = this.processLineData(callLine[0]);
                }
                if (source === 'email') {
                  const emailLine = data.map((item: any) => item.email);
                  this.processedEmailLine = this.processLineData(emailLine[0]);
                }
                if (source === 'social') {
                  const socialLine = data.map((item: any) => item.social);
                  this.processedSocialLine = this.processLineData(socialLine[0]);
                }
              });
              
              if (diffDays > 60) { // Assuming 30 days is the threshold for month-wise data combination
                this.combinedLine = this.combineSentimentMonthData(this.processedCallLine, this.processedEmailLine, this.processedSocialLine, sources);
              } else {
                this.combinedLine = this.combineSentimentDayData(this.processedCallLine, this.processedEmailLine, this.processedSocialLine, sources);
              }
            } else {
              sources.forEach(source => {
                if (source === 'call') {
                  const callLine = data.map((item: any) => item.call);
                  this.processedCallLine = this.processLineData(callLine[0]);
                }
                if (source === 'email') {
                  const emailLine = data.map((item: any) => item.email);
                  this.processedEmailLine = this.processLineData(emailLine[0]);
                }
                if (source === 'social') {
                  const socialLine = data.map((item: any) => item.social);
                  this.processedSocialLine = this.processLineData(socialLine[0]);
                }
              });
              this.combinedLine = this.combineSentimentMonthData(this.processedCallLine, this.processedEmailLine, this.processedSocialLine, sources);
            }
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
  }
  

  processLineData(lineData: any[]): any[] {
    return lineData
      .filter((item: any) => this.isDateInRange(item.Date))
      .map((item: any) => {
        const sentimentCounts = item.Sentiment;
        return {
          Date: item.Date,
          negative: sentimentCounts.negative,
          neutral: sentimentCounts.neutral,
          positive: sentimentCounts.positive,
        };
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

  combineSentimentMonthData(callData: any[], emailData: any[], socialData: any[], sources: string[]) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const combinedDataMap: { [key: string]: any } = {};

    const processData = (dataArray: any[]) => {
      dataArray.forEach(data => {
        const date = new Date(data.Date);
        const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        if (!combinedDataMap[monthYear]) {
          combinedDataMap[monthYear] = {
            Date: monthYear,
            positive: 0,
            negative: 0,
            neutral: 0
          };
        }
        combinedDataMap[monthYear].positive += data.positive;
        combinedDataMap[monthYear].negative += data.negative;
        combinedDataMap[monthYear].neutral += data.neutral;
      });
    };

    sources.forEach(source => {
      if (source === 'call') {
        processData(callData);
      }
      if (source === 'email') {
        processData(emailData);
      }
      if (source === 'social') {
        processData(socialData);
      }
    });

    this.dates = Object.values(combinedDataMap).map((entry: any) => entry.Date);
    this.positive = Object.values(combinedDataMap).map((entry: any) => entry.positive);
    this.negative = Object.values(combinedDataMap).map((entry: any) => entry.negative);
    this.neutral = Object.values(combinedDataMap).map((entry: any) => entry.neutral);

    this.lineChartShow();
  }

  combineSentimentDayData(callData: any[], emailData: any[], socialData: any[], sources: string[]) {
    const combinedDataMap: { [key: string]: any } = {};
  
    const processData = (dataArray: any[]) => {
      dataArray.forEach(data => {
        const date = new Date(data.Date);
        const dayMonthYear = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Format: YYYY-MM-DD
  
        if (!combinedDataMap[dayMonthYear]) {
          combinedDataMap[dayMonthYear] = {
            Date: dayMonthYear,
            positive: 0,
            negative: 0,
            neutral: 0
          };
        }
        combinedDataMap[dayMonthYear].positive += data.positive;
        combinedDataMap[dayMonthYear].negative += data.negative;
        combinedDataMap[dayMonthYear].neutral += data.neutral;
      });
    };
  
    sources.forEach(source => {
      if (source === 'call') {
        processData(callData);
      }
      if (source === 'email') {
        processData(emailData);
      }
      if (source === 'social') {
        processData(socialData);
      }
    });
  
    this.dates = Object.values(combinedDataMap).map((entry: any) => entry.Date);
    this.positive = Object.values(combinedDataMap).map((entry: any) => entry.positive);
    this.negative = Object.values(combinedDataMap).map((entry: any) => entry.negative);
    this.neutral = Object.values(combinedDataMap).map((entry: any) => entry.neutral);
  
    this.lineChartShow();
  }

  

  lineChartShow() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.dates,
      datasets: [
        {
          label: 'Positive',
          data: this.positive,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          tension: 0.4,
          backgroundColor: 'rgba(60,180,16,0.2)'
        },
        {
          label: 'Negative',
          data: this.negative,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--red-500'),
          tension: 0.4,
          backgroundColor: 'rgba(152,37,40,0.2)'
        },
        {
          label: 'Neutral',
          data: this.neutral,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };
  

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.1,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
}
