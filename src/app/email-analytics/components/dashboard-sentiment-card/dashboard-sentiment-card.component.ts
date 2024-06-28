import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard-sentiment-card',
  templateUrl: './dashboard-sentiment-card.component.html',
  styleUrl: './dashboard-sentiment-card.component.scss'
})
export class DashboardSentimentCardComponent {
  loading = false;
  dialogVisible = false;
  value:number = 0.7
  options: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: -1,
        max: 1,
        splitNumber: 3,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.33, '#FF6E76'],
              [0.66, '#FDDD60'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 0 // previous value: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 0 // previous value: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value: number) {
            return '';
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '25%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value * 100) + ' %';
          },
          color: 'inherit'
        },
        data: [
          {
            value: this.value,
            // name: 'Overall Sentiment'
          }
        ]
      }
    ]
  };

  load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogVisible = true;
    }, 1000);
  }
  
}  