import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { CallRecordingService } from "../../services/call-recording.service";
import {CallRecording, SentiCatg, Topic} from "../../types";
import { CallAnalyticsService } from "../../services/call-analytics.service";
import { SomeService } from "../../services/some.service";
import {cleanData} from "jquery";

@Component({
  selector: 'app-filtering-features',
  templateUrl: './filtering-features.component.html',
  styleUrl: './filtering-features.component.scss',

})
export class FilteringFeaturesComponent implements OnInit{

  rangeDates: Date[] | undefined;
  keyword: any;   //Keyword
  duration: number = 0;  //Slider
  topic: Topic[] | undefined;
  topics: string[] = [];
  keywords: string[] = [];
  selectedTopic!: any;
  sentiCatg: SentiCatg[] | undefined;
  selectedSentiCatg!: any; //changed
  callFiltering: CallRecording[] = [];
  currentTime: any;
  dateString: any;
  end_date : string = '';
  start_date : string = '';
  sentimentCatg : string[] = [];  //changed
  noResultsMessage: string = 'Search Recordings';
  callRecordings: never[] | undefined;
  visibility: boolean = true;
  constructor(private callRecordingService: CallRecordingService) { }

  ngOnInit(): void {
    this.topic = [
      {name: 'Pricing', code: 'PCG'},
      {name: 'Product', code: 'PDT'},
      {name: 'services', code: 'SVC'},
      {name: 'Issues', code: 'IS'},
      {name: 'Website', code: 'WS'}
    ];

    this.sentiCatg = [
      {name: 'Positive', code: 'POS'},
      {name: 'Neutral', code: 'NEU'},
      {name: 'Negative', code: 'NEG'}
    ];
    }

  applyFeatures() {
    try {
      this.dateString = this.rangeDates;
      console.log("Date", this.rangeDates)

      if (this.dateString != null || this.dateString != undefined) {
        this.start_date = this.dateString[0] ?? '';
        this.end_date = this.dateString[1] ?? '';
      }

      if (this.keyword != null) {

        console.log(this.keyword);
        this.keywords = this.keyword.split(',');
        console.log(this.keywords);

      }

      this.topics = [] ;
      // Check if duration is null, if so, assign 0
      const duration = this.duration == null || undefined ? 0 : this.duration;
      this.duration = duration

      // Check if selectedSentiCatg is null, if so, assign an empty string
      //this.sentimentCatg = this.selectedSentiCatg == null || undefined? '' : this.selectedSentiCatg.name;

      if(this.selectedSentiCatg != null){
        for (let item of this.selectedSentiCatg) {
          this.sentimentCatg.push(item.name);
        }
      }

      console.log(duration, this.sentimentCatg );

      if(this.selectedTopic != null){
        for (let item of this.selectedTopic) {
          this.topics.push(item.name);
        }
      }

      console.log(this.topics);

      // Call applyFeatures method from the service with required parameters
      this.callRecordingService.applyFeatures(duration, this.keywords, this.sentimentCatg , this.start_date, this.end_date, this.topics)
        .subscribe((response: any) => {
          console.log("response ", response);
          if (response.data.length == 0) {
            this.noResultsMessage = "Oops! There are no results matching your search criteria.";
            this.visibility = true;
            this.callFiltering = [];
          } else {
            this.noResultsMessage = '';
            this.visibility = false;
            this.callFiltering = response.data.map((record: any) => {
              return {
                id: record["_id"]["$oid"],
                description: record.description,
                transcription: record.transcription,
                callUrl: record.call_recording_url,
                duration: record.call_duration ?? 4.39,
                date: new Date(record.call_date['$date']),
                sentiment: record.sentiment_category,
                call_id : record.call_id
              } as CallRecording;
            });
          }          
          console.log('Call recordings refreshed:', this.callFiltering);
        });
    } catch (error) {
      console.log("There's an error");
    }
  }

  protected readonly cleanData = cleanData;

  cleanDate() : void {
    this.end_date  = '';
    this.start_date  = '';
  }

  clearFields() {
    this.rangeDates = undefined;
    this.keyword = '';
    this.duration = 0;
    this.selectedTopic = [];
    this.selectedSentiCatg = [];
    this.keywords = [];
    this.topics = [];
    console.log('Fields cleared');
  }
}
