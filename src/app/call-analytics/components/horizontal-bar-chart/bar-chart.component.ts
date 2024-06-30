import { Component, OnInit } from '@angular/core';
import { CallAnalyticsService } from "../../services/call-analytics.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  data: any;

  options: any;

  constructor(private analyticsService: CallAnalyticsService) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.options = {
      indexAxis: 'x',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: { mode: 'index', intersect: false },
        legend: { display: false },
      },
    };
    this.analyticsService.getTopicsDistribution().then(response => {
      if (response.status) {
        const topicsData: { [key: string]: number } = response.data;
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
    });
  }
}
