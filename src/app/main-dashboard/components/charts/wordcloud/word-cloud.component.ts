import { Component, Input, OnInit,EventEmitter, OnChanges, SimpleChanges,Output } from '@angular/core';
declare var $: any;
import { DateRangeService } from '../../../services/shared-date-range/date-range.service';
import { ChartsService } from '../../../services/charts.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

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
export class WordcloudComponent implements OnInit,OnChanges {
  @Input() title!: string;
  @Output() changesEvent = new EventEmitter<boolean>();
  @Input() sources!:string[];
  words: WordCloudItem[] = [];

  selectedCategories:any[]=[];
  categories:string[]=['email','call','social'];

  selectedDateRange: string[] | undefined;
  Date: any;

  private socketSubscription: Subscription | undefined;

  callWord: string[] = [];
  emailWord: string[] = [];
  socialWord: string[] = [];

  @Input() changes:boolean=false;

  constructor(private dateRangeService: DateRangeService,private chartService: ChartsService){}
  ngOnInit() {
    this.selectedCategories=this.sources;

    if(this.selectedCategories){
      this.wordCloudExtract(this.selectedCategories);
    }
    
    timer(0,1000).subscribe(() => {
      if(this.changes){
          this.wordCloudExtract(this.selectedCategories);
        this.changes=false;
      }
    });
    // this.socketSubscription = this.chartService.messages$.subscribe(
    //   message => {
    //     if (message.response === 'data') {
    //       if(this.sources){
    //         this.wordCloudExtract(this.sources);
    //       }
    //     }
    //   }
    // );

    this.dateRangeService.currentDateRange.subscribe(range => {
      if (range && range.length === 2 && range[0] && range[1]) {
        this.selectedDateRange = range.map(date => this.formatDate(date));
        this.Date = null;
        if(this.selectedCategories){
          this.wordCloudExtract(this.selectedCategories);
        }
      } else if(range && range.length === 2 && range[0]){
        this.selectedDateRange = undefined;
        this.Date = this.formatDate(range[0]);
        if(this.selectedCategories){
          this.wordCloudExtract(this.selectedCategories);
        }
      }
    });
  }

  onSourceChange(category:any){
    if(this.selectedCategories[0]!=null){
      this.wordCloudExtract(this.selectedCategories);
    }
    else{
      this.selectedCategories=this.sources;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['changes'] && changes['changes'].currentValue === true) {
      // Defer the method execution until after the view has been checked
      setTimeout(() => {
        this.chartDataGet();
        this.changesEvent.emit(false); // Reset the changes flag to false
      });
    }
  }

  chartDataGet(): void {
    this.chartService.chartData().subscribe(
      (response) => {       
        caches.open('all-data').then(cache => {
          cache.match('data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
                // Compare the response with the cached data
                if (!this.isEqual(response, cachedData)) {
                  // Update only the changed data in the cache
                  // const updatedData = { ...cachedData, ...response };
                  const dataResponse = new Response(JSON.stringify(response), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('data', dataResponse);
                  // this.DataCacheChange = true;
                }
              });
            } else {
              // Cache the response if no cached data exists
              const dataResponse = new Response(JSON.stringify(response), {
                headers: { 'Content-Type': 'application/json' }
              });
              cache.put('data', dataResponse);
            }
          });
        });
        this.changes=true;
      },
      (error) => {
        console.error('Error fetching doughnut chart data:', error);
      } 
    );
  }
  
  isEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) return false;
  
    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        return false;
      }
    }
    return true;
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
                           .flatMap((callItem: any)=> callItem.Word)
                );
              }
              if (source === 'email') {
                this.emailWord = data.flatMap((item: any) =>
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date))
                            .flatMap((emailItem: any) => emailItem.Word)
                );
              }
              if (source === 'social') {
                this.socialWord = data.flatMap((item: any) =>
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date))
                             .flatMap((socialItem: any) => socialItem.Word)
                );
              }
            });

            const allWords = [...this.callWord, ...this.emailWord, ...this.socialWord];
            this.words = this.aggregateWordCloudData(allWords);
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
