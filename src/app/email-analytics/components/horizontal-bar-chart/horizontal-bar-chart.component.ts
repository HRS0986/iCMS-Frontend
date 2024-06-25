import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})
export class HorizontalBarChartComponent {
  
  @Input() title!: string;
  @Input() sbtChartLabels: string[] = [];
  @Input() sbtChartColors: any[] = [];
  @Input() sbtChartValues: any[] = [];


  data: any;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    

    this.data = {
      labels: this.sbtChartLabels || ['TravelBox', 'VEGA', 'Lia', 'Negorate', 'ReviewSpotter'],
      datasets: [
        {
      
          backgroundColor:this.sbtChartColors || [
            'rgba(34, 197, 94, 0.9)',
            'rgba(243, 114, 44, 0.9)',
            'rgba(0, 150, 199, 0.9)',
            'rgba(249, 65, 68, 0.9)',
            'rgba(151, 71, 255, 0.9)'
          ],
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.sbtChartValues || [185, 100, 480, 300, 250]
        }
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false
        },
      },
    };
  }
}
