import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-horizontal-bar-chart',
  templateUrl: './multi-horizontal-bar-chart.component.html',
  styleUrl: './multi-horizontal-bar-chart.component.scss'
})
export class MultiHorizontalBarChartComponent implements OnInit {
    data: any;
    options: any;

    @Input() title!: string;
    @Input() labels!: string[];
    @Input() avgPositiveValues!: number[];
    @Input() avgNeutralValues!: number[];
    @Input() avgNegativeValues!: number[];

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: this .labels || ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Average positive sentiment',
                    backgroundColor: documentStyle.getPropertyValue('--positive-color'),
                    borderColor: documentStyle.getPropertyValue('--positive-color'),
                    data: this.avgPositiveValues || [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Average neutral sentiment',
                    backgroundColor: documentStyle.getPropertyValue('--neutral-color'),
                    borderColor: documentStyle.getPropertyValue('--neutral-color'),
                    data: this.avgNeutralValues
                },
                {
                  label: 'Average negative sentiment',
                  backgroundColor: documentStyle.getPropertyValue('--negative-color'),
                  borderColor: documentStyle.getPropertyValue('--negative-color'),
                  data: this.avgNegativeValues
              }
            ]
        };

        this.options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
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
