import { Component, OnInit } from '@angular/core';
import { Thresholds } from '../../structs';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'settings-thresholds',
  templateUrl: './settings-thresholds.component.html',
  styleUrl: './settings-thresholds.component.scss'
})
export class SettingsThresholdsComponent implements OnInit{
  list_thresholds: Thresholds[] = [];
  thresholds!: Thresholds[];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://127.0.0.1:8000/social-media/get_sentiment_shift_')
      .subscribe(response => {
        const list_thresholds = response[0] as Thresholds[];
      
        
    this.thresholds = list_thresholds
    

  });
  
  
}
 


}
