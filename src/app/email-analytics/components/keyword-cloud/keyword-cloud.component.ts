import { Component, Input } from '@angular/core';

interface Keyword {
  text: string;
  size: number;
}

@Component({
  selector: 'app-keyword-cloud',
  templateUrl: './keyword-cloud.component.html',
  styleUrl: './keyword-cloud.component.scss',
})
export class KeywordCloudComponent {
  @Input() keywords: Keyword[] = [];
  @Input() title!: string;
  calculateFontSize(frequency: number): number {
    return Math.floor(Math.sqrt(frequency) * 8); // Adjust the factor for desired scale
  }
}
