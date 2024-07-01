import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-effi-effec-donought-chart',
  templateUrl: './effi-effec-donought-chart.component.html',
  styleUrl: './effi-effec-donought-chart.component.scss'
})
export class EffiEffecDonoughtChartComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() chartData!: any[];
  @Input() chartLabels!: any[];

  data: any;
  options: any;

  ngOnInit() {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges) {
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
          data: this.chartData || [100, 30, 10, 30],
          backgroundColor: [
            "rgba(241, 144, 25, 0.9)",
            "rgba(241, 219, 25, 0.9)",
            "rgba(37, 228, 23, 0.9)",
            "rgba(17, 193, 14, 0.9)"
          ],
          hoverBackgroundColor: ["rgba(190, 114, 22, 0.9)", "rgba(180, 164, 20, 0.9)", "rgba(29, 172, 19, 0.9)", "rgba(11, 121, 9, 0.9)"]
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
          }
        }
      }
    };
  }
}