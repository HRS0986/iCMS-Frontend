import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartsService } from '../../../services/charts.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  data: any;
  options: any;
  @Input() percentages!:number[];
  cacheChange:boolean =false;
  constructor(private http: HttpClient, private chartsService:ChartsService) {
  }

  ngOnInit() {
    this.updateChartData();
    // this.countFetch();
    // this.updateChartData();
    // timer(0, 2000).subscribe(() => {
    //   this.doughnutChart();
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
            console.log(data);
            this.percentages = [
              data[0].data.negative,
              data[0].data.positive,
              data[0].data.neutral
            ];
            this.updateChartData();
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
    
  }

  
  doughnutChart() {
    this.chartsService.doughnutChart().subscribe(
      (newData: any) => {
        caches.open('doughnutChart').then(cache => {
          cache.match('doughnut-data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
            
                if (!this.isEqual(newData, cachedData)) {
                  const dataResponse = new Response(JSON.stringify(newData), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('doughnut-data', dataResponse);
                  console.log(dataResponse);
                }
              });
            } else {
              const dataResponse = new Response(JSON.stringify(newData), {
                headers: { 'Content-Type': 'application/json' }
              });
              cache.put('doughnut-data', dataResponse);
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

  updateChartData() {
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
