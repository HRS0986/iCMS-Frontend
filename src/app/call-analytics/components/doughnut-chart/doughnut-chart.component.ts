import { Component, Input, OnInit } from '@angular/core';
import { CallAnalyticsService } from "../../services/call-analytics.service";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  data: any;
  options: any;

  constructor(private callAnalyticsService: CallAnalyticsService) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    let callStatistics = this.callAnalyticsService.getCallStatistics()
    this.data = {
      labels: ['Negative', 'Positive', 'Neutral'],
      datasets: [
        {
          data: [callStatistics.negativeCalls, callStatistics.positiveCalls, callStatistics.neutralCalls],
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


    this.options = {
      cutout: '50%',
      height: 600,
      overrides: {
        legend: {
          padding: 50
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,

            color: textColor
          },
        }
      }
    };
  }
}
