import { Component, OnInit } from '@angular/core';
import { CallRecordingService } from "../../services/call-recording.service";
import {CallRecord, CallRecording} from "../../types";
import { CallAnalyticsService } from "../../services/call-analytics.service";


interface Topic {
  name: string;
  code: string;
}

interface SentiCatg{
  name: string;
  code: string;
}
@Component({
  selector: 'app-filtering-features',
  templateUrl: './filtering-features.component.html',
  styleUrl: './filtering-features.component.scss',
})
export class FilteringFeaturesComponent implements OnInit{
  rangeDates: Date[] | undefined;

  value: string | undefined;   //Keyword

  value1!: number;  //Slider

  topic: Topic[] | undefined;

  selectedTopic: Topic | undefined;

  sentiCatg: SentiCatg[] | undefined;

  selectedSentiCatg: SentiCatg | undefined;

  ngOnInit() {
      this.topic = [
          { name: 'Pricing', code: 'PCG' },
          { name: 'Product', code: 'PDT' },
          { name: 'services', code: 'SVC' },
          { name: 'Issues', code: 'IS' },
          { name: 'Website', code: 'WS' }
      ];

      this.sentiCatg = [
        { name: 'Positive', code: 'POS' },
        { name: 'Neutral', code: 'NEU' },
        { name: 'Negative', code: 'NEG' }
      ];

      this.callRecordingService.getCallsList().subscribe((data) => {
        // Map the fetched data to match the structure of callRecordings
        if (data.data.length === 0) {
          this.callRecordings = [
            {id: "cr_0", description: "Call Recording Title2", date: new Date(), duration: 3.7, sentiment: "Positive", callUrl: "dumyy url", transcription: "dummy transcription"},
            {id: "cr_1", description: "Call Recording Title3", date: new Date(), duration: 3.7, sentiment: "Negative", callUrl: "dumyy url", transcription: "dummy transcription"},
            {id: "cr_2", description: "Call Recording Title4", date: new Date(), duration: 3.7, sentiment: "Neutral", callUrl: "dumyy url", transcription: "dummy transcription"},
            {id: "cr_3", description: "Call Recording Title5", date: new Date(), duration: 3.7, sentiment: "Negative", callUrl: "dumyy url", transcription: "dummy transcription"},
            {id: "cr_4", description: "Call Recording Title6", date: new Date(), duration: 3.7, sentiment: "Positive", callUrl: "dumyy url", transcription: "dummy transcription"},
          ];
          console.log('Initial summaryCalls:', this.callRecordings);
          // TODO: Ask From Eranda
          this.noCalls = this.callRecordings.length == 0;
        } else {
          this.callRecordings = data.data.map((record: any) => {
            return {
              id: record.id,
              description: record.description,
              transcription: record.transcription,
              callUrl: record.call_recording_url,
              duration: record.call_duration ?? 4.39,
              date: new Date(record.call_date),
              sentiment: record.sentiment
            } as CallRecording;
          });
          console.log('Fetched callRecordings:', this.callRecordings);
        }
  
      });
  }

  onConfirmApply(callId: string) {
    this.visibleConfirmation = false;
    this.applyFeaures(callId);
  }

  applyFeatures(call_id: string) {
    this.callRecordingService.applyFeatures(call_id).subscribe({
      next: (data) => {
        console.log('Feaures Applied', data);
        this.refreshCallRecordings();  // Method to refresh the call recordings list
      },
      error: (error) => {
        console.error('Error applying features', error);
      }
    });
  }

  refreshCallRecordings() {
    this.callRecordingService.getCallsList().subscribe((data) => {
      this.callRecordings = data.data.map((record: CallRecord) => ({
        "title": record.description,
        "date": new Date(record.call_date).toLocaleDateString(),
        "status": record.sentiment_category,
        "summary": record.summary,
        "call_url": record.call_recording_url,
        "transcription": record.transcription,
        "duration": record.call_duration,
        "call_id": record.call_id,
        "analytics_id": record.analytics_id
      }));
      console.log('Call recordings refreshed:', this.callRecordings);
    }, error => {
      console.error('Failed to refresh call recordings:', error);
    });
  }
}

