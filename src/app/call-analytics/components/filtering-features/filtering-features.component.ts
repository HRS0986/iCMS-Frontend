import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallRecordingService } from "../../services/call-recording.service";
import { CallRecording } from "../../types";
import { CallAnalyticsService } from "../../services/call-analytics.service";

interface Topic {
  name: string;
  code: string;
}

interface SentiCatg {
  name: string;
  code: string;
}

@Component({
  selector: 'app-filtering-features',
  templateUrl: './filtering-features.component.html',
  styleUrl: './filtering-features.component.scss',
})
export class FilteringFeaturesComponent implements OnInit {
  rangeDates: Date[] | undefined;

  value: any;   //Keyword

  value1!: number;  //Slider

  topic: Topic[] | undefined;

  selectedTopic!: Topic;

  sentiCatg: SentiCatg[] | undefined;

  selectedSentiCatg!: SentiCatg;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  callRecordings: CallRecording[] = [];
  statusColors!: { [key: string]: string };
  visibleSummary: boolean = false;
  visiblePlay: boolean = false;
  visibleConfirmation: boolean = false;
  selectedCall!: CallRecording; // Add a property to store the selected call details
  noCalls: boolean = false;
  audio: any;
  audioPosition: any;
  currentTime: any;
  totalTime: any;
  selectedCallSummary: string = "";
  dateString: any;

  constructor(private callRecordingService: CallRecordingService, private callAnalyticsService: CallAnalyticsService) { }

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

    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    this.callRecordingService.getCallsList().subscribe((data) => {
      // Map the fetched data to match the structure of callRecordings
      if (data.data.length === 0) {
        // this.callRecordings = [
        //   { id: "cr_0", description: "Call Recording Title2", date: new Date(), duration: 3.7, sentiment: "Positive", callUrl: "dumyy url", transcription: "dummy transcription" },
        //   { id: "cr_1", description: "Call Recording Title3", date: new Date(), duration: 3.7, sentiment: "Negative", callUrl: "dumyy url", transcription: "dummy transcription" },
        //   { id: "cr_2", description: "Call Recording Title4", date: new Date(), duration: 3.7, sentiment: "Neutral", callUrl: "dumyy url", transcription: "dummy transcription" },
        //   { id: "cr_3", description: "Call Recording Title5", date: new Date(), duration: 3.7, sentiment: "Negative", callUrl: "dumyy url", transcription: "dummy transcription" },
        //   { id: "cr_4", description: "Call Recording Title6", date: new Date(), duration: 3.7, sentiment: "Positive", callUrl: "dumyy url", transcription: "dummy transcription" },
        // ];
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
    console.log('noCalls:', this.noCalls);
    this.statusColors = {
      "Positive": documentStyle.getPropertyValue("--positive-color"),
      "Negative": documentStyle.getPropertyValue("--negative-color"),
      "Neutral": documentStyle.getPropertyValue("--neutral-color")
    }
  }

  onConfirmApply(callId: string) {
    this.visibleConfirmation = false;
    this.applyFeatures();
  }

  showDialogSummary(call: CallRecording): void {
    this.selectedCall = call;
    this.callAnalyticsService.getCallSummary(call.id).then(response => {
      this.selectedCallSummary = response.data.summary;
      console.log(response);
      console.log(call);
    }).catch(err => {
      console.log(err)
      this.selectedCallSummary = "Sorry, failed to get the call summary."
    }).finally(() => {
      this.visibleSummary = true;
    });
  }

  showDialogPlay(call: CallRecording): void {
    this.selectedCall = call;
    this.visiblePlay = true;
  }

  showDialogConfirmation(call: CallRecording): void {
    this.selectedCall = call;
    this.visibleConfirmation = true;
  }

  // Function to play the audio
  playAudio(audioUrl: string) {
    if (!this.audio) {
      this.audio = new Audio(audioUrl);
      this.audio.play();

    } else {
      // If audio is already playing, resume from the stop position
      this.audio.play();
    }
    this.audio.currentTime = this.audioPosition;
    this.audio.addEventListener('timeupdate', this.updateTime.bind(this));
  }

  pauseAudio() {
    if (this.audio) {
      // Store the current playback position before pausing
      this.audio.pause();
      this.audioPosition = this.audio.currentTime;
    }
  }

  resumeAudio() {
    if (this.audio && this.audioPosition !== null) {
      this.audio.play();
      this.audio.currentTime = this.audioPosition;
    }
  }

  increaseVolume() {
    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    if (audioElement) {
      audioElement.volume += 0.1; // Increase volume by 0.1
    }
  }

  updateTime() {
    if (this.audio) {
      this.currentTime = this.audio.currentTime;
      this.totalTime = this.audio.duration;
    }
  }

  applyFeatures() {
    this.dateString = this.rangeDates;
    console.log(this.dateString)
    console.log(this.selectedTopic)
    console.log(this.value)
    console.log(this.selectedSentiCatg)


    let start_date = this.dateString[0];
    let end_date = this.dateString[1];
    
    // Call applyFeatures method from the service with required parameters
    this.callRecordingService.applyFeatures(this.value1, this.value, this.selectedSentiCatg.name, start_date, end_date, this.selectedTopic)
      .subscribe((response: any) => {
        // Handle the response here if needed
      });
  }


  refreshCallRecordings() {
    this.callRecordingService.getCallsList().subscribe((data) => {
      this.callRecordings = data.data.map((record: CallRecording) => ({
        "title": record.description,
        "date": new Date(record.date).toLocaleDateString(),
        "status": record.sentiment,
        "summary": record.description,
        "call_url": record.callUrl,
        "transcription": record.transcription,
        "duration": record.duration,
        "call_id": record.id,
        // "analytics_id": record.analytics_id
      }));
      console.log('Call recordings refreshed:', this.callRecordings);
    }, error => {
      console.error('Failed to refresh call recordings:', error);
    });
  }
}
