import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-time-graph',
  templateUrl: './dashboard-time-graph.component.html',
  styleUrl: './dashboard-time-graph.component.scss'
})
export class DashboardTimeGraphComponent {
  dialogVisible: boolean = false;

  popup() {
    this.dialogVisible = true;
  }

  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'Email count',
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  backgroundColor: "rgba(0, 100, 250, 0.4)",
                  yAxisID: 'y',
                  tension: 0.4,
                  data: [65, 59, 80, 81, 56, 55, 10]
              },
              {
                  label: 'First Response Time',
                  fill: true,
                  borderColor: documentStyle.getPropertyValue('--green-500'),
                  backgroundColor: "rgba(0, 200, 100, 0.2)",
                  yAxisID: 'y1',
                  tension: 0.4,
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };
      
      this.options = {
          stacked: false,
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor,
                  },
                  position: "bottom",
              },
              title: {
                display: true,
                color: textColor,
                text: 'First Response Time',	
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
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
                      color: surfaceBorder
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
                      color: surfaceBorder
                  }
              }
          }
      };
  }
}
