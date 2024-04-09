import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-email-acc-card',
  templateUrl: './email-acc-card.component.html',
  styleUrl: './email-acc-card.component.scss'
})
export class EmailAccCardComponent {
  @Input() emailAddress!: string;
  @Input() nickName!: string;
  @Output() deleteReadingAccount = new EventEmitter<void>();

  onDelete(): void {
    this.deleteReadingAccount.emit();
  }

}
