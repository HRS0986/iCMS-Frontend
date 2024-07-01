import { Component, Input, OnInit } from '@angular/core';
import { BestOperatorItem } from "../../types";

@Component({
  selector: 'best-operators-card',
  templateUrl: './best-operators-card.component.html',
  styleUrl: './best-operators-card.component.scss'
})
export class BestOperatorsCardComponent implements OnInit {
  @Input() title!: string;
  @Input() operatorRankings!: BestOperatorItem[];

  ngOnInit() {
  }

  protected readonly Math = Math;
}
