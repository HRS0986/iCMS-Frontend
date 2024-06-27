import { Component, Input, OnInit } from '@angular/core';
import { DashboardApiService } from '../../../services/dashboard-api.service';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})

export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  @Input() percentages!: number[];
  data: any;

  options: any;

  constructor(private DashboardAPiService:DashboardApiService){}

  ngOnInit() {
    this.fetchSentimentPercentages();
  }

  fetchSentimentPercentages() {
    this.DashboardAPiService.getSentimentPercentage()
      .subscribe(
        (data: any) => {
          this.percentages = data.percentage; // Update percentages with data from backend

          // Update chart data and options
          this.data = {
            labels: ['Negative', 'Neutral', 'Positive'],
            datasets: [
              {
                data: this.percentages,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)'
                ],
                hoverBackgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
                ]
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
                  color: '--text-color'
                },
              }
            }
          };
        },
        (error) => {
          console.error('Error fetching sentiment percentages:', error);
        }
      );
  }
}

