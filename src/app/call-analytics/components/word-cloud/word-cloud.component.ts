import { Component } from '@angular/core';
import { CloudData, CloudOptions } from "angular-tag-cloud-module";

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrl: './word-cloud.component.scss'
})
export class WordCloudComponent {
  options: CloudOptions = {
    width: 1000,
    height: 340,
    overflow: false,
  };

  data: CloudData[] = [
    {text: 'Weight-8-link-color', weight: 8, color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 6, tooltip: 'display a tooltip'},
  ];
}
