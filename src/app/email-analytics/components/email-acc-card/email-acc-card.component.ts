import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-email-acc-card',
  templateUrl: './email-acc-card.component.html',
  styleUrl: './email-acc-card.component.scss'
})
export class EmailAccCardComponent {
  @Input() emailAddress!: string;
  @Input() nickName!: string;
  @Output() editReadingAccount = new EventEmitter<void>();
  @Output() deleteReadingAccount = new EventEmitter<void>();

  onEdit(): void{
    this.editReadingAccount.emit();
  }

  onDelete(): void {
    this.deleteReadingAccount.emit();
  }



}
