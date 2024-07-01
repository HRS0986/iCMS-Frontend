import { Component, Input, OnInit } from '@angular/core';
import { WordCloudItem } from "../../types";

declare var $: any;

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrl: './wordcloud.component.scss'
})
export class WordcloudComponent implements OnInit {
  @Input() title!: string;
  @Input("words") wordList!: WordCloudItem[];

  ngOnInit() {
    $("#wordCloud").jQWCloud({
      words: this.wordList,
      maxFont: 50,
      minFont:10,
      verticalEnabled: true,
      padding_left: null,
      word_click :function(event: any){
        console.log(event.target.textContent);
      },
      word_mouseOver :function(){},
      word_mouseEnter :function(){},
      word_mouseOut :function(){},
      beforeCloudRender:function(){},
      afterCloudRender:function(){}

    });
  }
}
