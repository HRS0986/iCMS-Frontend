import { Component,Input, OnInit } from '@angular/core';
import { WordCloudItem } from '../../../shared/types';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { HttpClient } from '@angular/common/http';
import { data, error } from 'jquery';

declare var $: any;

@Component({
  selector: 'word-cloud-topics',
  templateUrl: './word-cloud-topics.component.html',
  styleUrl: './word-cloud-topics.component.scss'
})
export class WordCloudSmComponent implements OnInit{

  @Input() title!: string;
  @Input("words") wordList!: WordCloudItem[];


  constructor(private ProductsService:DashboardApiService,
    private http:HttpClient
  ){}

  ngOnInit() {
    this.ProductsService.getProductTrendData('2024-05-01', '2024-07-01').subscribe(
      (data: any) => {
        console.log(this.wordList);
        
        const wordList: WordCloudItem[] = data.map((item: any) => ({
          word: item.identified_product,
          weight: item.count
        }));

        console.log(wordList);
        

        $("#wordCloud-1").jQWCloud({
          words: wordList,
          maxFont: 50,
          minFont: 10,
          verticalEnabled: true,
          padding_left: null,
          word_click: function(event: any) {
            console.log(event.target.textContent);
          },
          word_mouseOver: function() {},
          word_mouseEnter: function() {},
          word_mouseOut: function() {},
          beforeCloudRender: function() {},
          afterCloudRender: function() {}
        });
      },
      (error: any) => {
        console.error('Error fetching keyword trend data:', error);
      }
    );
  }
}