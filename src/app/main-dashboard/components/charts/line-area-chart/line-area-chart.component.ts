import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartsService } from '../../../services/charts.service';

@Component({
  selector: 'app-line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent implements OnInit {
  @Input() title!: string;
  data: any;
  options: any;

  dates: any =  ["Jan 2020", "Feb 2020", "Mar 2020"];
  positive:any =   [50,15,6];
  negative:any = [25,10,15];
  neutral:any = [55,62,70];

  constructor(private http: HttpClient, private authService : ChartsService) { }

  ngOnInit() {
  this.lineChartShow();
  // this.countFetch();
  }


  countFetch(){
    this.authService.lineChart().subscribe(data => {
      const DateWithSentiments = data;
        this.dates = Object.values(DateWithSentiments).map((entry: any) => entry.Date);
        this.positive = Object.values(DateWithSentiments).map((entry: any) => entry.Positive);
        this.negative = Object.values(DateWithSentiments).map((entry: any) => entry.Negative);
        this.neutral = Object.values(DateWithSentiments).map((entry: any) => entry.Neutral);
    }
  );
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
