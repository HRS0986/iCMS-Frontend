import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {
  @Input() name!: string;
  @Output() deleteCheckingTopic = new EventEmitter<void>();

  onDelete(): void {
    this.deleteCheckingTopic.emit();
  }
  
}
