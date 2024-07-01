import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CallAnalyticsConfig } from "../../config";
import { UIChart } from "primeng/chart";

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  @Input() percentages!: number[];
  @ViewChild('dChart') dChart!: UIChart;
  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  constructor() {
  }

  ngOnInit() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: CallAnalyticsConfig.SentimentCategories,
      datasets: [
        {
          data: this.percentages,
          backgroundColor: [
            this.documentStyle.getPropertyValue('--negative-color'),
            this.documentStyle.getPropertyValue('--positive-color'),
            this.documentStyle.getPropertyValue('--neutral-color'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--negative-hover-color'),
            this.documentStyle.getPropertyValue('--positive-hover-color'),
            this.documentStyle.getPropertyValue('--neutral-hover-color')
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

  refreshChart(dataset: number[]) {
    // this.data = {
    //   labels: CallAnalyticsConfig.SentimentCategories,
    //   datasets: [
    //     {
    //       data: dataset,
    //       backgroundColor: [
    //         this.documentStyle.getPropertyValue('--negative-color'),
    //         this.documentStyle.getPropertyValue('--positive-color'),
    //         this.documentStyle.getPropertyValue('--neutral-color'),
    //       ],
    //       hoverBackgroundColor: [
    //         this.documentStyle.getPropertyValue('--negative-hover-color'),
    //         this.documentStyle.getPropertyValue('--positive-hover-color'),
    //         this.documentStyle.getPropertyValue('--neutral-hover-color')
    //       ]
    //     }
    //   ]
    // };
    this.dChart.refresh();
  }
}
