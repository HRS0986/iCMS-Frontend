import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Negative', 'Positive', 'Neutral'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6E76', '#7CFFB2', '#FDDD60'],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400')]
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
