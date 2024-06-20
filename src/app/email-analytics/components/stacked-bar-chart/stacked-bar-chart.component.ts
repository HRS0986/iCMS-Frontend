import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent implements OnInit {

  data: any;
  options: any;

  @Input() title!: string;
  @Input() labels!: string[];
  @Input() negativeDataSet!: number[];
  @Input() neutralDataSet!: number[];
  @Input() positiveDataSet!: number[];



    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: this.labels || ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'bar',
                    label: 'No of negative emails',
                    backgroundColor: documentStyle.getPropertyValue('--negative-color'),
                    data: this.negativeDataSet || [50, 25, 12, 48, 90, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'No of netural emails',
                    backgroundColor:   documentStyle.getPropertyValue('--neutral-color'),
                    data: this.neutralDataSet || [21, 84, 24, 75, 37, 65, 34]
                },
                {
                    type: 'bar',
                    label: 'No of positive emails',
                    backgroundColor: documentStyle.getPropertyValue('--positive-color'),
                    data: this.positiveDataSet || [41, 52, 24, 74, 23, 21, 32]
                }
            ]
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
