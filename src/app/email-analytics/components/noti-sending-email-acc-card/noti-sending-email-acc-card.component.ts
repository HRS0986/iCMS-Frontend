import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-noti-sending-email-acc-card',
  templateUrl: './noti-sending-email-acc-card.component.html',
  styleUrl: './noti-sending-email-acc-card.component.scss'
})
export class NotiSendingEmailAccCardComponent {
  @Input() emailAddress!: string;
  @Output() deleteNotiSendingAccount = new EventEmitter<void>();

  onDelete(): void {
    this.deleteNotiSendingAccount.emit();
  }
  
}
