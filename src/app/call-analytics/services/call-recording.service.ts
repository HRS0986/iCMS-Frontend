import { Injectable } from '@angular/core';
import { CallRecording } from "../types";

@Injectable({
  providedIn: 'root'
})
export class CallRecordingService {

  constructor() { }

  public getRecentCalls(): CallRecording[] {
    return [
      {
        callUrl: "lkhfdkghlkjs",
        title: "Call Recording 01",
        date: new Date(),
        status: "Positive"
      },
      {
        callUrl: "lkhfdkghlkjs",
        title: "Call Recording 02",
        date: new Date(),
        status: "Positive"
      },
      {
        callUrl: "lkhfdkghlkjs",
        title: "Call Recording 04",
        date: new Date(),
        status: "Neutral"
      },
      {
        callUrl: "lkhfdkghlkjs",
        title: "Call Recording 01",
        date: new Date(),
        status: "Negative"
      },
      {
        callUrl: "lkhfdkghlkjs",
        title: "Call Recording 04",
        date: new Date(),
        status: "Neutral"
      }
    ];
  }
}
