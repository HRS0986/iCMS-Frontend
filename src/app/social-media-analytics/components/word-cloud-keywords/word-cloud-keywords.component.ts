import { Component , Input} from '@angular/core';
import { WordCloudItem } from '../../../shared/types';
import { DashboardApiService } from '../../services/dashboard-api.service';

declare var $: any;

@Component({
  selector: 'word-cloud-keywords',
  templateUrl: './word-cloud-keywords.component.html',
  styleUrl: './word-cloud-keywords.component.scss'
})
export class WordCloudSm2Component {
  @Input() title!: string;
  @Input("words") wordList!: WordCloudItem[];

  constructor(private DashboardAPiService: DashboardApiService) {}

  ngOnInit() {
    this.DashboardAPiService.getKeywordTrendData('2024-01-01', '2024-06-30').subscribe(
      (data: any) => {
        const wordList: WordCloudItem[] = data.map((item: any) => ({
          word: item.identified_keyword,
          weight: item.count
        }));

        $("#wordCloud-2").jQWCloud({
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