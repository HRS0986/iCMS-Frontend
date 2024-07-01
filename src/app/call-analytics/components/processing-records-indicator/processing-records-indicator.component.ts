import { Component, OnInit } from '@angular/core';
import {CallRecordingService} from "../../services/call-recording.service";

@Component({
  selector: 'app-processing-records-indicator',
  templateUrl: './processing-records-indicator.component.html',
  styleUrls: ['./processing-records-indicator.component.scss']
})
export class ProcessingRecordsIndicatorComponent implements OnInit {
  pendingCallData: any;
  isLoading: boolean = true;
  constructor(
    private callRecordingService: CallRecordingService  ) {
  }
  ngOnInit() {
    this.reloadDataSource();
  }
  reloadDataSource(): void {
    try {
      this.isLoading = true;
      this.callRecordingService.getPendingCallsList().subscribe((data) => {
        // Map the fetched data to match the structure of callRecordings
        if (data.status) {
          if (data.data.length > 0) {
            this.pendingCallData = data.data
            console.log('Pending callRecordings:', data.data);
          }
        }
        this.isLoading = false;
      }, (error) => {
        console.error('Error fetching call recordings', error);
      });
    } catch (error) {
      console.error('Error fetching recordings', error);
    }
  }
}
