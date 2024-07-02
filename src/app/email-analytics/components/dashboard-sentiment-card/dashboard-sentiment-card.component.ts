import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { UtilityService } from '../../services/utility.service';
import { CommonColors } from '../../interfaces/utility';

@Component({
  selector: 'app-dashboard-sentiment-card',
  templateUrl: './dashboard-sentiment-card.component.html',
  styleUrl: './dashboard-sentiment-card.component.scss'
})
export class DashboardSentimentCardComponent implements OnInit {

  @Input() intervalInDaysStart!: number;
  @Input() intervalInDaysEnd!: number;
  
  loading = false;
  dialogVisible = false;
  option!: EChartsOption;

  value: number = -0.1;

  colors: CommonColors = {};

  constructor(
    private utility: UtilityService,
  ) { }

  ngOnInit() {
    this.colors = this.utility.getColors();
    this.option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '70%'], // Position of the gauge (center of the chart)
          radius: '80%', // Size of the gauge
          startAngle: 180,
          endAngle: 0,
          min: -1,
          max: +1,
          splitNumber: 2,
          itemStyle: {
            // color: '#58D9F9',
            color: this.getColor(this.value),
            // shadowColor: 'rgba(0,138,255,0.45)',
            shadowColor: 'rgba(50,50,50,0.2)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            // width: 18,
            width: 10,
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            // length: '75%',
            length: '80%',
            // width: 16,
            width: 10,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              // width: 18,
              width: 10,
            }, 
    
          },
          axisTick: {
            splitNumber: 2,
            lineStyle: {
              width: 2,
              color: '#999'
            },
            distance: -20,
          },
          splitLine: {
            length: 8,
            lineStyle: {
              width: 3,
              color: '#999'
            },
            distance: -20,
          },
          axisLabel: {
            // distance: 30,
            distance: -15,
            color: '#999',
            fontSize: 15
          },
          title: {
            show: false
          },
          detail: {
  
            // borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            borderRadius: 8,
            offsetCenter: [0, '45%'],
            valueAnimation: true,
            formatter: function (value: number) {
              return '{mytext|score} {value|' + value.toFixed(2) + '}';
            },
            rich: {
              value: {
                // fontSize: 50,
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#777'
              },
              mytext: {
                // fontSize: 30,
                fontSize: 15,
                color: '#999',
              }
            }
          },
          data: [
            {
              value: this.value,
            }
          ]
        }
      ]
    };
  
  }

  getColor(value: number) {
    if (value < -0.3) {
      return '#FF4500';
      // return this.colors.negative || '#FF4500';
    } else if (value < 0.3) {
      return '#FFA500';
      // return this.colors.neutral || '#FF4500'; // Yellow-Orange '#FFA500'
    } else {
      return '#32CD32';
      // return this.colors.positive || '#32CD32'; // Green
    }
  }


  popup() {
    this.dialogVisible = true;
  }
  
}  