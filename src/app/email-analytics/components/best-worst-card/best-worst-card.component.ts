import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-best-worst-card',
  templateUrl: './best-worst-card.component.html',
  styleUrl: './best-worst-card.component.scss'
})
export class BestWorstCardComponent {

  @Input() header!: string;
  @Input() card_content!: any;
  @Input() bgcolor!: string;

  
  

}
