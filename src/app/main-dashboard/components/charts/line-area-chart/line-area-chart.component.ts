import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartsService } from '../../../services/charts.service';
import { timer } from 'rxjs';
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
  @Input() positive!:any;
  @Input() negative!:any;
  @Input() neutral!:any;
  cacheChange:boolean =false;
  
  constructor(private http: HttpClient, private chartService : ChartsService) { }

  ngOnInit() {
  this.lineChartShow();
  // this.countFetch();
  // timer(0, 2000).subscribe(() => {
  //   // this.lineAreaChart();
  //   if(this.cacheChange==true)
  //     {
  //       this.countFetch();
  //       this.cacheChange=false;
  //     }    
  // });
  }


  countFetch(){
    caches.open('widgets').then(cache => {
      cache.match('widgets-data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            const DateWithSentiments = data[1].data;
            this.dates = Object.values(DateWithSentiments).map((entry: any) => entry.Date);
            this.positive = Object.values(DateWithSentiments).map((entry: any) => entry.positive);
            this.negative = Object.values(DateWithSentiments).map((entry: any) => entry.negative);
            this.neutral = Object.values(DateWithSentiments).map((entry: any) => entry.neutral);
            this.lineChartShow();
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
  }

  lineAreaChart() {
    this.chartService.lineChart().subscribe(
      (newData: any) => {
        caches.open('LineChart').then(cache => {
          cache.match('line-data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
                if (!this.isEqual(newData, cachedData)) {
                  const dataResponse = new Response(JSON.stringify(newData), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('line-data', dataResponse);
                  console.log(dataResponse);
                }
              });
            } else {
              const dataResponse = new Response(JSON.stringify(newData), {
                headers: { 'Content-Type': 'application/json' }
              });
              cache.put('line-data', dataResponse);
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
        this.cacheChange=true;
        return false;
      }
    }
    return true;
  }

  lineChartShow(){
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
