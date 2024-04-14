import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallRecordingService } from "../../services/call-recording.service";
import { CallRecord } from "../../types";

@Component({
  selector: 'app-call-summary-chart',
  templateUrl: './call-summary-chart.component.html',
  styleUrl: './call-summary-chart.component.scss'
})
export class CallSummaryChartComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  callRecordings: any = [];
  statusColors!: { [key: string]: string };
  visibleSummary: boolean = false;
  visiblePlay: boolean = false;
  visibleConfirmation: boolean = false;
  selectedCall: any; // Add a property to store the selected call details
  noCalls: boolean = false;
  audio: any;
  audioPosition: any;
  currentTime: any;
  totalTime: any;

  constructor(private callRecordingService: CallRecordingService) { }

  ngOnInit() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    this.callRecordingService.getCallsList().subscribe((data) => {
      // Map the fetched data to match the structure of callRecordings
      if (data.data.length === 0) {
        this.callRecordings = [
          {"title": "Call Recording Title1", "date": (new Date()).toLocaleDateString(), "status": "Positive"},
          {"title": "Call Recording Title2", "date": (new Date()).toLocaleDateString(), "status": "Negative"},
          {"title": "Call Recording Title3", "date": (new Date()).toLocaleDateString(), "status": "Neutral"},
          {"title": "Call Recording Title4", "date": (new Date()).toLocaleDateString(), "status": "Negative"},
          {"title": "Call Recording Title5", "date": (new Date()).toLocaleDateString(), "status": "Positive"},
        ];
        console.log('Initial summaryCalls:', this.callRecordings);
        // TODO: Ask From Eranda
        this.noCalls = this.callRecordings.length == 0;
      } else {
        this.callRecordings = data.data.map((record: CallRecord) => {
          return {
            "title": record.description,
            "date": new Date(record.call_date).toLocaleDateString(),
            "status": record.sentiment_category,
            "summary": record.summary,
            "call_url": record.call_recording_url,
            "transcription": record.transcription,
            "duration": record.call_duration,
            "call_id": record.call_id,
            "analytics_id": record.analytics_id
          };
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

  onConfirmDelete(callId: string, analyticsId: string) {
    this.visibleConfirmation = false;
    this.deleteCall(callId, analyticsId);
  }

  showDialogSummary(call: any): void {
    this.selectedCall = call;
    this.visibleSummary = true;
  }

  showDialogPlay(call: any): void {
    this.selectedCall = call;
    this.visiblePlay = true;
  }

  showDialogConfirmation(call: any): void {
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

  deleteCall(call_id: string, analytics_id: string) {
    this.callRecordingService.deleteCallsOfList(call_id, analytics_id).subscribe({
      next: (data) => {
        console.log('Delete successful', data);
        this.refreshCallRecordings();  // Method to refresh the call recordings list
      },
      error: (error) => {
        console.error('Error deleting call', error);
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
