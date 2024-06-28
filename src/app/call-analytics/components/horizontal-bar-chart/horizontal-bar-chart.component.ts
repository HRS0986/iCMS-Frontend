import { Component, OnInit } from '@angular/core';
import { CallSettingsService } from "../../services/call-settings.service";
import { CallSettingsDetails } from "../../types";

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})
export class HorizontalBarChartComponent implements OnInit {
  data: any;

  options: any;

  constructor(private settingsService: CallSettingsService) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.settingsService.getNotificationSettings().subscribe(response => {
      let data: CallSettingsDetails = response.data;
      this.data = {
        labels: data.topics,
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
            data: Array.from({ length: data.topics!.length }, () =>
              Math.floor(Math.random() * 101)
            )
          }
        ]
      };

      this.options = {
        indexAxis: 'x',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: false
          },
        },
      };
    })
  }
}
