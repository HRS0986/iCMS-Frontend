import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() imgPath!: string;
  @Input() isLoading!: boolean;
}
