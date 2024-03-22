import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})

export class ProgressBarComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() bufferValue!: number;
  @Input() color: string = '#4CAF50';

  valuePercentage!: number;
  bufferPercentage!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] || changes['bufferValue']) {
      this.valuePercentage = this.value;
      this.bufferPercentage = this.bufferValue - this.valuePercentage;
    }
  }
}