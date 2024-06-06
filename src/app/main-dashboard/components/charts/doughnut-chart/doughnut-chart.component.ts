import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartsService } from '../../../services/charts.service';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {
  @Input() title!: string;
  data: any;
  options: any;
  percentages:number[] = [10,50,70];
  constructor(private http: HttpClient, private authService:ChartsService) {
  }

  ngOnInit() {
    
    // this.countFetch();
    this.updateChartData();
  }

  countFetch(){
    this.authService.doughnutChart().subscribe(
      (counts: any) => {
        this.percentages = [
          counts.negative,
          counts.positive,
          counts.neutral
        ];
      }
    );
  }

  updateChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: ['Negative', 'Positive', 'Neutral'],
      datasets: [
        {
          data: this.percentages,
          backgroundColor: [
            documentStyle.getPropertyValue('--negative-color'),
            documentStyle.getPropertyValue('--positive-color'),
            documentStyle.getPropertyValue('--neutral-color'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--yellow-400')
          ]
        }
      ]
    };
  }

}
