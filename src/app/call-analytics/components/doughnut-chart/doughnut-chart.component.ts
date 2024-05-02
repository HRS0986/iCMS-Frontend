import { Component, Input, OnInit } from '@angular/core';
import { CallAnalyticsConfig } from "../../config";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  @Input() percentages!: number[];
  data: any;
  options: any;

  constructor() {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: CallAnalyticsConfig.SentimentCategories,
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
