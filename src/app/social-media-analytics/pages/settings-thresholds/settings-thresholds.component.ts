import { Component, OnInit } from '@angular/core';
import { Thresholds } from '../../models/settings';
import { SettingsApiService } from '../../services/settings-api.service';

@Component({
  selector: 'settings-thresholds',
  templateUrl: './settings-thresholds.component.html',
  styleUrls: ['./settings-thresholds.component.scss']
})

export class SettingsThresholdsComponent implements OnInit {
  topBarCaption: string = "Add New";
  list_thresholds: Thresholds[] = [];
  thresholds!: Thresholds[];
  loading: boolean = true;

  constructor(private settingsApiService: SettingsApiService) { }

  ngOnInit() {
    this.settingsApiService.getSentimentShift().subscribe(response => {
      const list_thresholds = response as Thresholds[];
      list_thresholds.forEach((item: any) => {
        if (item.sm_id === 'SM01') {
          item.platform = "Facebook";
        } else {
          item.platform = "Instagram";
        }
      });
      this.thresholds = list_thresholds;
      this.loading = false;
    });
  }
}
