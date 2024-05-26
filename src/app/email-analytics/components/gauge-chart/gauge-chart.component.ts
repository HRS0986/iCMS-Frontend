import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrl: './gauge-chart.component.scss'
})
export class GaugeChartComponent {
  
  @Input() dataValue!: number;
  
  options!: EChartsOption;

  constructor() { }

  ngOnInit(): void {
    this.initializeOptions();
  }

  initializeOptions() {
    this.options = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: -1,
          max: 1,
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.2, '#db0b0b'],
                [0.4, '#fa8c00'],
                [0.6, '#ffdc28'],
                [0.8, '#82dc46'],
                [1, '#44c022']
              ]
            }
          },
          axisTick: {
            show: true
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '50%',
            width: 20,
            offsetCenter: [0, '-15%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false,
            fontSize: 50,
            offsetCenter: [0, '-10%'],
            valueAnimation: true,
            color: 'inherit',
          },
          data: [
            {
              value: this.dataValue 
            }
          ]
        }
      ]
    };
  }


}
