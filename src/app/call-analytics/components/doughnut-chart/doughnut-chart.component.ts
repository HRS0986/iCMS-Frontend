import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CallAnalyticsConfig } from "../../config";
import { UIChart } from "primeng/chart";

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() percentages!: number[];
  @ViewChild('dChart') dChart!: UIChart;
  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    this.initializeChart(this.percentages);

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['percentages'] && !changes['percentages'].firstChange) {
      this.refreshChart(this.percentages);
    }
  }

  refreshChart(dataset: number[]) {
    this.initializeChart(dataset);
    this.cd.detectChanges(); // Trigger change detection
    this.dChart.reinit(); // Ensure the chart is reinitialized
  }

  initializeChart(percentages: number[]) {
    this.data = {
      labels: CallAnalyticsConfig.SentimentCategories,
      datasets: [
        {
          data: percentages,
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
  }
}
