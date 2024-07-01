import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SentimentOverTimeDataSet } from "../../types";
import { UIChart } from "primeng/chart";


@Component({
  selector: 'line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrl: './line-area-chart.component.scss'
})
export class LineAreaChartComponent implements OnInit {
  @Input() title!: string;
  @Input() dataset!: SentimentOverTimeDataSet[];
  @ViewChild('lChart') lChart!: UIChart;

  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  ngOnInit() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.1,
      plugins: {
        legend: {
          labels: {color: textColor}
        }
      },
      scales: {
        x: {
          ticks: {color: textColorSecondary},
          grid: {color: surfaceBorder},
        },
        y: {
          ticks: {color: textColorSecondary},
          grid: {color: surfaceBorder},
          stepSize: 1
        }
      }
    };
    this.initializeChart(this.dataset);
  }

  refreshChart(dataset: SentimentOverTimeDataSet[]) {
    this.initializeChart(dataset);
    this.lChart.refresh();
  }

  initializeChart(dataset: SentimentOverTimeDataSet[]) {
    let analyticsData = dataset;
    analyticsData.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const xLabels = analyticsData.map((data: any) => data.date);
    const positiveData = analyticsData.map((data: any) => data.positive);
    const negativeData = analyticsData.map((data: any) => data.negative);
    const neutralData = analyticsData.map((data: any) => data.neutral);

    this.data = {
      labels: xLabels,
      datasets: [
        {
          label: 'Positive',
          data: positiveData,
          fill: true,
          borderColor: this.documentStyle.getPropertyValue('--positive-color'),
          tension: 0.4,
          backgroundColor: 'rgba(60,180,16,0.2)'
        },
        {
          label: 'Negative',
          data: negativeData,
          fill: true,
          borderColor: this.documentStyle.getPropertyValue('--negative-color'),
          tension: 0.4,
          backgroundColor: 'rgba(152,37,40,0.2)'
        },
        {
          label: 'Neutral',
          data: neutralData,
          fill: true,
          borderColor: this.documentStyle.getPropertyValue('--neutral-color'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };
  }
}
