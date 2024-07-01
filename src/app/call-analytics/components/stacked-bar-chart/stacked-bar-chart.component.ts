import { Component, Input, OnInit } from '@angular/core';
import { OperatorAnalyticsOverTimeRecord } from "../../types";

@Component({
  selector: 'stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent implements OnInit {
  @Input() title!: string;
  @Input() dataset!: OperatorAnalyticsOverTimeRecord[];

  data: any;
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: this.textColor
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: this.textColorSecondary
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false
        },
      },
      y: {
        stepSize: 1,
        stacked: true,
        ticks: {
          color: this.textColorSecondary
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false
        }
      }
    }
  };

  ngOnInit() {
    let data_over_time = this.dataset;
    this.data = {
      labels: data_over_time.map(dt => dt.operator_name.slice(0, 5)),
      datasets: [
        {
          type: 'bar',
          label: 'Positive',
          backgroundColor: this.documentStyle.getPropertyValue('--positive-color') + this.documentStyle.getPropertyValue('--alpha-value'),
          data: data_over_time.map(dt => dt.positive)
        },
        {
          type: 'bar',
          label: 'Neutral',
          backgroundColor: this.documentStyle.getPropertyValue('--neutral-color') + this.documentStyle.getPropertyValue('--alpha-value'),
          data: data_over_time.map(dt => dt.neutral)
        },
        {
          type: 'bar',
          label: 'Negative',
          backgroundColor: this.documentStyle.getPropertyValue('--negative-color') + this.documentStyle.getPropertyValue('--alpha-value'),
          data: data_over_time.map(dt => dt.negative)
        }
      ]
    };
  }
}
