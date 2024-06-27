import { Component ,Input} from '@angular/core';
import { DashboardApiService } from '../../../services/dashboard-api.service';


@Component({
  selector: 'line-chart-facebook',
  templateUrl: './line-chart-facebook.component.html',
  styleUrl: './line-chart-facebook.component.scss'
})
export class LineChartFacebookComponent {
  @Input() title!: string;
  data: any;
  

  options: any;

  constructor(private facebookdataApiservice:DashboardApiService){}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const startDate = '2024-05-01';
    const endDate = '2024-07-01';

    this.facebookdataApiservice.getFacebookAnalysisData(startDate, endDate)
      .subscribe(
        (data: any) => {
          console.log(data);
          
          this.data = {
            labels: Object.keys(data['1']),
            datasets: [
              {
                label: 'Reacts',
                data: Object.values(data['1']),
                borderColor: document.documentElement.style.getPropertyValue('--blue-500'),
              },
              {
                label: 'Comments',
                data: Object.values(data['2']),
                borderColor: document.documentElement.style.getPropertyValue('--grey-500'),
              },
            ]
          };
        },
        error => {
          console.error('Error fetching Facebook Analysis Data:', error);
          // Handle error (e.g., show error message in UI)
        }
      );

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.1,
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
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
}