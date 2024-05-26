import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CallAnalyticsService } from "../../services/call-analytics.service";
import { OperatorAnalyticsOverTimeRecord } from "../../types";

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent implements OnInit {
  @Output() updateLoading = new EventEmitter<string>();

  data: any;
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: this.textColor
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: this.textColorSecondary
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: this.textColorSecondary
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false
        }
      }
    }
  };

  constructor(private callAnalyticsService: CallAnalyticsService) {
  }

  ngOnInit() {
    this.callAnalyticsService.getOperatorCallsOverTime().then(response =>{
      let data_over_time = response.data as OperatorAnalyticsOverTimeRecord[];
      this.data = {
        labels: data_over_time.map(dt => dt.operator_name.slice(0, 5)),
        datasets: [
          {
            type: 'bar',
            label: 'Positive',
            backgroundColor: this.documentStyle.getPropertyValue('--positive-color'),
            data: data_over_time.map(dt => dt.positive)
          },
          {
            type: 'bar',
            label: 'Neutral',
            backgroundColor: this.documentStyle.getPropertyValue('--neutral-color'),
            data: data_over_time.map(dt => dt.neutral)
          },
          {
            type: 'bar',
            label: 'Negative',
            backgroundColor: this.documentStyle.getPropertyValue('--negative-color'),
            data: data_over_time.map(dt => dt.negative)
          }
        ]
      };
      console.log(data_over_time)

      this.updateLoading.emit('operatorAnalytics');
    }).catch(err => {
      console.log(err);
      this.updateLoading.emit('operatorAnalytics');
      }
    ).finally(() => {
      console.log("ok")
      this.updateLoading.emit('operatorAnalytics');
    });
  }
}
