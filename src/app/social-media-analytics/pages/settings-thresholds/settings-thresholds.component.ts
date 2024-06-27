import { Component, OnInit } from '@angular/core';
import { Thresholds } from '../../models/settings';
import { SettingsApiService } from '../../services/settings-api.service';
import { ModalSetThresholdComponent } from '../../components/Modals/modal-set-threshold/modal-set-threshold.component';

@Component({
  selector: 'settings-thresholds',
  templateUrl: './settings-thresholds.component.html',
  styleUrl: './settings-thresholds.component.scss'
})

export class SettingsThresholdsComponent implements OnInit {
  topBarCaption:string = "Add New"
  list_thresholds: Thresholds[] = [];
  thresholds!: Thresholds[];

  constructor(private settingsApiService: SettingsApiService) { }

  ngOnInit() {
    this.settingsApiService.getSentimentShift().subscribe(response => {
      const list_thresholds = response[0] as Thresholds[];
      this.thresholds = list_thresholds
    });

  }
}
