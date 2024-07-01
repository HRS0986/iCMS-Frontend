import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-multi-vertical-bar-chart',
  templateUrl: './multi-vertical-bar-chart.component.html',
  styleUrl: './multi-vertical-bar-chart.component.scss'
})
export class MultiVerticalBarChartComponent implements OnInit{


  data: any;

  options: any;

  
  @Input() title!: string;
  @Input() labels!: string[];
  @Input() efficiency_dataset_for_issues!: number[];
  @Input() efficiency_dataset_for_inquiries!: number[];
  @Input() datasets!: any[];


    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
            labels: this.labels||['test1', "test2", "test3", "test4"],
            datasets: [
                {
                    label: "no of Resolved Issues",
                    backgroundColor: "rgba(18, 86, 222, 0.9)",
                    borderColor: "rgba(18, 86, 222, 0.9)",
                    data: this.efficiency_dataset_for_issues || [5,5,5,5]
                },
                {
                    label: 'no of Resolved Inquiries',
                    backgroundColor: "rgba(222, 18, 195, 0.9)",
                    borderColor: "rgba(222, 18, 195, 0.9)",
                    data: this.efficiency_dataset_for_inquiries || [5,5,5,5]
                }
            ]
        };

        this.options = {
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
