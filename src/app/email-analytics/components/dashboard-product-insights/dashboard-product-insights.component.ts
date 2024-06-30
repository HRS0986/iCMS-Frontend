import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-product-insights',
  templateUrl: './dashboard-product-insights.component.html',
  styleUrl: './dashboard-product-insights.component.scss'
})
export class DashboardProductInsightsComponent {
  dialogVisible = false;

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
          labels: ['API Dev', 'API Mon', 'Mercury', 'Cloud', 'IAM'],
          datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [65, 59, 80, 81, 56, 55, 40],

                  barPercentage: 0.3,
                  categoryPercentage: 1,
              },
          ]
      };

      this.options = {
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  display: false,
                  labels: {
                      color: textColor,
                  }
              },
              title: {
                display: true,
                color: textColor,
                text: 'Product Insights',
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false,
                      offset: false,
                  },
              }
          }
      };
  }
}
