import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent implements OnInit {
  options: any;
  data: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
      datasets: [
        {
          type: 'bar',
          label: 'Positive',
          backgroundColor: documentStyle.getPropertyValue('--positive-color'),
          data: [50, 25, 12, 48, 90, 76, 42, 69, 69, 69]
        },
        {
          type: 'bar',
          label: 'Neutral',
          backgroundColor: documentStyle.getPropertyValue('--neutral-color'),
          data: [21, 84, 24, 75, 37, 65, 34, 69, 69, 69]
        },
        {
          type: 'bar',
          label: 'Negative',
          backgroundColor: documentStyle.getPropertyValue('--negative-color'),
          data: [41, 52, 24, 74, 23, 21, 32, 69, 69, 69]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
