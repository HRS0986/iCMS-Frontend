import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})
export class HorizontalBarChartComponent {
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['TravelBox', 'VEGA', 'Lia', 'Negorate', 'ReviewSpotter'],
      datasets: [
        {
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.6)',
          //   'rgba(255, 205, 86, 0.6)',
          //   'rgba(75, 192, 192, 0.6)',
          //   'rgba(54, 162, 235, 0.6)',
          //   'rgba(153, 102, 255, 0.6)'
          // ],
          // borderColor: documentStyle.getPropertyValue('--blue-500'),
          // data: [65, 59, 80, 81, 56, 55, 40]
          backgroundColor: [
            'rgba(34, 197, 94, 0.9)',
            'rgba(243, 114, 44, 0.9)',
            'rgba(0, 150, 199, 0.9)',
            'rgba(249, 65, 68, 0.9)',
            'rgba(151, 71, 255, 0.9)'
          ],
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [185, 100, 480, 300, 250]
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
