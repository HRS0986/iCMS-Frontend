import { Component , Input} from '@angular/core';
import { WordCloudItem } from '../../../shared/types';

declare var $: any;

@Component({
  selector: 'word-cloud-keywords',
  templateUrl: './word-cloud-keywords.component.html',
  styleUrl: './word-cloud-keywords.component.scss'
})
export class WordCloudSm2Component {
  @Input() title!: string;
  @Input("words") wordList!: WordCloudItem[];

  ngOnInit() {
    $("#wordCloud-2").jQWCloud({
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
