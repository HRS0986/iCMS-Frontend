import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UIChart } from "primeng/chart";

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  @Input() title!: string;
  @Input() dataset!: { [key: string]: number };
  @Input() isLoading!: boolean;
  @ViewChild('bChart') bChart!: UIChart;

  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  ngOnInit() {
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

    this.initializeChart(this.dataset);
  }

  refreshChart(dataset: { [key: string]: number }) {
    this.initializeChart(dataset);
    this.bChart.refresh();
  }

  initializeChart(dataset: { [key: string]: number }) {
    const topicsData = dataset;
    const topicsList = Object.keys(topicsData);
    const topicsValues = Object.values(topicsData);
    this.data = {
      labels: topicsList,
      datasets: [
        {
          backgroundColor: this.documentStyle.getPropertyValue('--primary-color') + this.documentStyle.getPropertyValue('--alpha-value'),
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          data: topicsValues
        }
      ]
    };
  }
}
