import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent {
  @Input() sender!: string;
  @Input() receiver!: string;
  @Input() date!: Date;
  @Input() body!: string;
  @Input() sentiment!: string;
}
