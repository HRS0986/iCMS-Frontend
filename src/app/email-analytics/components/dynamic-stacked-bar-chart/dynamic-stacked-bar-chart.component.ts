import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-stacked-bar-chart',
  templateUrl: './dynamic-stacked-bar-chart.component.html',
  styleUrl: './dynamic-stacked-bar-chart.component.scss'
})
export class DynamicStackedBarChartComponent implements OnInit{

  data: any;
  options: any;

  @Input() title!: string;
  @Input() labels!: string[];
  @Input() datasets!: any[];



    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: this.labels ,
            datasets: this.datasets
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

}
