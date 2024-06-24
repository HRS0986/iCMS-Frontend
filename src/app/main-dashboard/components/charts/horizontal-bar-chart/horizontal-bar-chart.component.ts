import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})
export class HorizontalBarChartComponent {
  data:any;
  @Input() persentages: any=[65, 59, 80, 81, 56, 55, 40];
  @Input() labels: any=['Product', 'Service', 'Pricing', 'Issues', 'Website'];
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    // const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.labels,
      datasets: [
        {
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.persentages
        }
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false
        },
      },
    };
  }
}
