import { Component, Input, OnInit } from '@angular/core';
declare var $: any;
import { DateRangeService } from '../../../services/shared/date-range.service';

export interface WordCloudItem {
  word: string;
  weight: number;
  color?: string;
}

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordcloudComponent implements OnInit {
  @Input() title!: string;
  @Input() sources!:string[];
  words: WordCloudItem[] = [];

  selectedDateRange: string[] | undefined;
  Date: any;

  callWord: string[] = [];
  emailWord: string[] = [];
  socialWord: string[] = [];

  constructor(private dateRangeService: DateRangeService){}
  ngOnInit() {
    // this.wordCloudExtract(this.sources);
    // this.dateRangeService.currentDateRange.subscribe(range => {
    //   if (range && range.length === 2 && range[0] && range[1]) {
    //     this.selectedDateRange = range.map(date => this.formatDate(date));
    //     this.Date = null;
    //     this.wordCloudExtract(this.sources);
    //     console.log('Selected Date Range:', this.selectedDateRange);
    //   } else if(range && range.length === 2 && range[0]){
    //     this.selectedDateRange = undefined;
    //     this.Date = this.formatDate(range[0]);
    //     this.wordCloudExtract(this.sources);
    //     console.log('Incomplete Date Range:',this.Date );
    //   }
    // });
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    const parts = formattedDate.split(', ');

    // Format the date to remove the comma and ensure spacing
    const formattedDateString = `${parts[0]} ${parts[1]} ${parts[2]}`;
    return formattedDateString;
  }

  wordCloudExtract(sources: string[]): void {
    caches.open('all-data').then(cache => {
      cache.match('data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            sources.forEach(source => {
              if (source === 'call') {
                this.callWord = data.flatMap((item: any) =>
                  item.call.filter((callItem: any) => this.isDateInRange(callItem.Date))
                           .flatMap((callItem: any) => JSON.parse(callItem.Word))
                );
              }
              if (source === 'email') {
                this.emailWord = data.flatMap((item: any) =>
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date))
                            .flatMap((emailItem: any) => emailItem.Word)
                );
                console.log(this.emailWord);
              }
              if (source === 'social') {
                this.socialWord = data.flatMap((item: any) =>
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date))
                             .flatMap((socialItem: any) => JSON.parse(socialItem.Word))
                );
              }
            });

            const allWords = [...this.callWord, ...this.emailWord, ...this.socialWord];
            this.words = this.aggregateWordCloudData(allWords);
            console.log(this.words);
            this.showWords();
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
  }

  isDateInRange(dateStr: string): boolean {
    if (this.selectedDateRange && this.selectedDateRange.length === 2 && this.selectedDateRange[0] && this.selectedDateRange[1]) {
      const date = new Date(dateStr);
      const startDate = new Date(this.selectedDateRange[0]);
      const endDate = new Date(this.selectedDateRange[1]);
      return date >= startDate && date <= endDate;
    } else if (this.Date) {
      const date = new Date(dateStr);
      const currentDate = new Date(this.Date);
      return date >= currentDate && date <= currentDate;
    } else if (!this.selectedDateRange) {
      return true;
    }
    return false;
  }

  aggregateWordCloudData(words: string[]): WordCloudItem[] {
    const wordMap: { [key: string]: number } = {};

    words.forEach(word => {
      if (wordMap[word]) {
        wordMap[word] += 1;
      } else {
        wordMap[word] = 1;
      }
    });

    return Object.keys(wordMap).map(key => ({
      word: key,
      weight: wordMap[key],
      color: this.getRandomColor()
    }));
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  showWords() {
    console.log(this.words);
    $("#wordCloud").jQWCloud({
      words: this.words,
      maxFont: 60,
      minFont: 20,
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
  }
}
