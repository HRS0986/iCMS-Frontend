import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  @Input() title!: string;
  @Input() dataset!: { [key: string]: number };

  data: any;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.options = {
      indexAxis: 'x',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {mode: 'index', intersect: false},
        legend: {display: false},
      },
      scales: {
        y: {
          stepSize: 1
        }
      }
    };

    const topicsData = this.dataset;
    const topicsList = Object.keys(topicsData);
    const topicsValues = Object.values(topicsData);
    this.data = {
      labels: topicsList,
      datasets: [
        {
          backgroundColor: documentStyle.getPropertyValue('--primary-color') + documentStyle.getPropertyValue('--alpha-value'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: topicsValues
        }
      ]
    };
  }
}
