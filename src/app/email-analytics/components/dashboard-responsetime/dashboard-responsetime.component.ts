import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-responsetime',
  templateUrl: './dashboard-responsetime.component.html',
  styleUrl: './dashboard-responsetime.component.scss'
})
export class DashboardResponsetimeComponent {
  data: any;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['25 June', '26 June', '27 June', '28 June', '29 June', 'Yesterday', 'Today'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Second Dataset',
          data: [31, 20, 45, 60, 28, 19, 34],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      // aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
  ngOnChanges() {
    this.options.aspectRatio = 1;
  }
}
