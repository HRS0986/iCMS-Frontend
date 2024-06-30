import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare var $: any;
import { DateRangeService } from '../../../services/shared-date-range/date-range.service';
import { ChartsService } from '../../../services/charts.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";

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
export class WordcloudComponent implements OnInit, OnChanges{

  @Input() closable:boolean = true;

  @Output() deletedConfirmed: EventEmitter<void> = new EventEmitter<void>();
  @Output() hideConfirmed: EventEmitter<void> = new EventEmitter<void>();

  @Input() title!: string;
  @Output() changesEvent = new EventEmitter<boolean>();
  @Input() sources!: string[];
  @Input() changes: boolean = false;

  @Input() yAxis!:string;

  @ViewChild('wordCloudContainer', { static: false }) wordCloudContainer!: ElementRef;

  words: WordCloudItem[] = [];
  selectedCategories: any[] = [];
  categories: string[] = ['email', 'call', 'social'];
  selectedDateRange: string[] | undefined;
  Date: any;

  private socketSubscription: Subscription | undefined;
  callWord: string[] = [];
  emailWord: string[] = [];
  socialWord: string[] = [];

  items:MenuItem[] = []




  constructor(private dateRangeService: DateRangeService, private chartService: ChartsService,
    private authService:AuthenticationService
  ) {}

  ngOnInit() {

    this.items= [
      {
        icon: 'pi pi-ellipsis-v',
        items: [
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this['onDelete']();
            }
          },
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {
              this['onEdit']();
            }
          },
          {
            label: 'Hide',
            icon: 'pi pi-eye-slash',
            command: () => {
              this['confirmDeleted']();
            }
          }

          
        ]
      }

  ];
    this.selectedCategories = [...this.sources];  // Ensure a fresh copy is used
    this.categories = [...this.sources];  // Ensure a fresh copy is used


    timer(0, 1000).subscribe(() => {
      if (this.changes) {
        this.wordCloudExtract(this.selectedCategories);
        this.changes = false;
      }
    });

    this.dateRangeService.currentDateRange.subscribe(range => {
      if (range && range.length === 2 && range[0] && range[1]) {
        this.selectedDateRange = range.map(date => this.formatDate(date));
        this.Date = null;
        if (this.selectedCategories) {
          this.wordCloudExtract(this.selectedCategories);
        }
      } else if (range && range.length === 2 && range[0]) {
        this.selectedDateRange = undefined;
        this.Date = this.formatDate(range[0]);
        if (this.selectedCategories) {
          this.wordCloudExtract(this.selectedCategories);
        }
      }
      else{
        if (this.selectedCategories) {
          this.wordCloudExtract(this.selectedCategories);
        }
      }
    });
  }
  
  onDelete(){
    console.log('delete');
    this.deletedConfirmed.emit();
  }

  onEdit(){
    console.log('Edit');
  }

 confirmDeleted() {
        console.log('confirm button');
        this.hideConfirmed.emit();
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['changes'] && changes['changes'].currentValue === true) {
      setTimeout(() => {
        this.chartDataGet();
        this.changesEvent.emit(false);
      });
    }

    if (changes['sources']) {
      this.selectedCategories = [...changes['sources'].currentValue];
      this.wordCloudExtract(this.selectedCategories);
    }
  }

  onSourceChange(category: any) {
    if (this.selectedCategories[0] != null) {
      this.wordCloudExtract(this.selectedCategories);
    } else {
      this.selectedCategories = [...this.sources];
    }
  }

  chartDataGet(): void {
    this.authService.getIdToken().subscribe((token) =>{
    this.chartService.chartData(token).subscribe(
      (response) => {
        caches.open('all-data').then(cache => {
          cache.match('data').then((cachedResponse) => {
            if (cachedResponse) {
              cachedResponse.json().then((cachedData: any) => {
                if (!this.isEqual(response, cachedData)) {
                  const dataResponse = new Response(JSON.stringify(response), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  cache.put('data', dataResponse);
                }
              });
            } else {
              const dataResponse = new Response(JSON.stringify(response), {
                headers: { 'Content-Type': 'application/json' }
              });
              cache.put('data', dataResponse);
            }
          });
        });
        this.changes = true;
      },

    );
  });
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

    const formattedDateString = `${parts[0]} ${parts[1]} ${parts[2]}`;
    return formattedDateString;
  }

  wordCloudExtract(sources: string[]): void {
    caches.open('all-data').then(cache => {
      cache.match('data').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            let callWord: string[] = [];
            let emailWord: string[] = [];
            let socialWord: string[] = [];

            sources.forEach(source => {
              if (source === 'call') {
                if(this.yAxis=='topics')
                  {
                    callWord = data.flatMap((item: any) =>
                      item.call
                        .filter((callItem: any) => this.isDateInRange(callItem.Date))
                        .flatMap((callItem: any) =>
                          callItem.data.flatMap((dataItem: any) => dataItem.topic)
                        ).filter((element: any) => element != null)
                    );
                  }
                else if(this.yAxis=='keywords'){
                  callWord = data.flatMap((item: any) =>
                    item.call
                      .filter((callItem: any) => this.isDateInRange(callItem.Date))
                      .flatMap((callItem: any) =>
                        callItem.data.flatMap((dataItem: any) => dataItem.keywords)
                      ).filter((element: any) => element != null)
                  );
                }

              }
              if (source === 'email') {
                if(this.yAxis=='topics')
                  {
                emailWord = data.flatMap((item: any) =>
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date))
                    .flatMap((emailItem: any) =>
                      emailItem.data.flatMap((dataItem: any) => dataItem.topic)).filter((element: any) => element != null)
                );

              }
              else if(this.yAxis=='keywords'){
                emailWord = data.flatMap((item: any) =>
                  item.email.filter((emailItem: any) => this.isDateInRange(emailItem.Date))
                    .flatMap((emailItem: any) =>
                      emailItem.data.flatMap((dataItem: any) => dataItem.keywords)).filter((element: any) => element != null)
                );
              }
              }
              if (source === 'social') {
                if(this.yAxis=='products')
                  {
                socialWord = data.flatMap((item: any) =>
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date))
                    .flatMap((socialItem: any) =>
                      socialItem.data.flatMap((dataItem: any) => dataItem.products)).filter((element: any) => element != null)
                );
              }
              else if(this.yAxis=='keywords'){
                socialWord = data.flatMap((item: any) =>
                  item.social.filter((socialItem: any) => this.isDateInRange(socialItem.Date))
                    .flatMap((socialItem: any) =>
                      socialItem.data.flatMap((dataItem: any) => dataItem.keywords)).filter((element: any) => element != null)
                );
              }
              }
            });

            this.callWord = callWord;
            this.emailWord = emailWord;
            this.socialWord = socialWord;

            const allWords = [...this.callWord, ...this.emailWord, ...this.socialWord];
            this.words = this.aggregateWordCloudData(allWords);
            this.showWords();
          });
        }
        //  else {
        //   console.log('Data not found in cache');
        // }
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
    if (!this.words || this.words.length === 0) {
      console.error('No words to display in the word cloud.');
      return;
    }

    console.log('Words:', this.words);  // Debugging: Check the words array

    $(this.wordCloudContainer.nativeElement).jQWCloud({
      words: this.words,
      maxFont: 60,
      minFont: 40,
      verticalEnabled: true,
      padding_left: null,
      word_click: function (event: any) {
        console.log(event.target.textContent);
      },
      word_mouseOver: function () { },
      word_mouseEnter: function () { },
      word_mouseOut: function () { },
      beforeCloudRender: function () { },
      afterCloudRender: function () { }
    });
  }
}
