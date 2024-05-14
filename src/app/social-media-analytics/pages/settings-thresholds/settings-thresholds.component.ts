import { Component, OnInit } from '@angular/core';
import { Content } from '../../structs';


interface Thresholds {
  id: string;
  platform: string;
  alertType: string;
  overallSentiment: string | number; // Change the type to string | number
  color: string;
  min: number;
  max: number;
}

const thresholdsData: Thresholds[] = [
  {
    id: '1000',
    platform: 'Facebook',
    alertType: 'Email',
    overallSentiment: '45%-72%',
    color: '#0BB783',
    min: 45,
    max: 72
  },
  {
    id: '1001',
    platform: 'Instegram',
    alertType: 'App',
    overallSentiment: 'more than 50%',
    color: '#0BB783',
    min: 50,
    max: 100
  },
  {
    id: '1002',
    platform: 'Linkeld',
    alertType: 'App',
    overallSentiment: 'Less than 11%',
    color: '#0BB783',
    min: 0,
    max: 11
  }
];

@Component({
  selector: 'settings-thresholds',
  templateUrl: './settings-thresholds.component.html',
  styleUrl: './settings-thresholds.component.scss'
})
export class SettingsThresholdsComponent implements OnInit{
  thresholds!: Thresholds[];

  ngOnInit() {
    this.thresholds = thresholdsData
  }
  
  
  

  onRowEdit(item: Thresholds) {
  }

  onRowDelete(item: Thresholds) {
  }


}
