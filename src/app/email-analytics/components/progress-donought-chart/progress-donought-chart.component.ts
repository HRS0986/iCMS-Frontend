import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-donought-chart',
  templateUrl: './progress-donought-chart.component.html',
  styleUrl: './progress-donought-chart.component.scss'
})
export class ProgressDonoughtChartComponent implements OnInit, OnChanges{
  @Input() title!: string;
  @Input() chartData!: any[];
  @Input() chartLabels!: any[];

  data: any;
  options: any;

  ngOnInit() {
    this.initializeChart();
  }

  ngOnChanges(changes: any) {
    // if (changes.chartData && changes.chartData.currentValue) {
    //   this.data.datasets[0].data = changes.chartData.currentValue;
    // }

    if (changes['chartData'] && changes['chartData'].currentValue) {
      if (this.data && this.data.datasets) {
        this.data.datasets[0].data = changes['chartData'].currentValue;
      } else {
        this.initializeChart();  // Ensure the chart is initialized
        this.data.datasets[0].data = changes['chartData'].currentValue;
      }
    }
  }

  private initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData || [70, 30],
          backgroundColor: [
            "rgba(42, 77, 85, 0.9)",
            "rgba(13, 172, 117, 0.9)"
          ],
          hoverBackgroundColor: ["rgba(64, 113, 124, 0.9)", "rgba(18, 222, 151, 0.9)"]
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
