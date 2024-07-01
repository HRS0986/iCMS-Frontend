import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operator-card-item',
  templateUrl: './operator-card-item.component.html',
  styleUrl: './operator-card-item.component.scss'
})
export class OperatorCardItemComponent {
  @Input("totalCalls") callCount!: number;
  @Input("name") name!: string;
  @Input("id") id!: number;
  @Input("avgHandleTime") avg!: number;
  @Input("rank") rank!: number;

  rankColors = [
    'gold',
    'silver',
    'brown'
  ]
}
