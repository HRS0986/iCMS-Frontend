import { Component,Input} from '@angular/core';

@Component({
  selector: 'line-chart-instagram',
  templateUrl: './line-chart-instagram.component.html',
  styleUrl: './line-chart-instagram.component.scss'
})
export class LineChartInstagramComponent {
  @Input() title!: string;
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
          label: 'Reacts',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          
          
        },
        {
          label: 'Comments',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          
          
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.1,
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
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }


}
