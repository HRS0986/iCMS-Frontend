import { Component, OnInit } from '@angular/core';
import { CallRecordingService } from "../../services/call-recording.service";
import { CallRecording } from "../../types";

@Component({
  selector: 'app-recent-calls-card',
  templateUrl: './recent-calls-card.component.html',
  styleUrl: './recent-calls-card.component.scss'
})
export class RecentCallsCardComponent implements OnInit {
  recentCalls: CallRecording[] = [];
  statusColors!: {[key: string]: string};

  constructor(private callRecordingService: CallRecordingService) {
  }

  ngOnInit() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.recentCalls = this.callRecordingService.getRecentCalls();

    this.statusColors = {
      "Positive": documentStyle.getPropertyValue("--positive-color"),
      "Negative": documentStyle.getPropertyValue("--negative-color"),
      "Neutral": documentStyle.getPropertyValue("--neutral-color")
    }
  }
}
