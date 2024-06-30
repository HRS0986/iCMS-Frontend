import { Component, OnInit } from '@angular/core';
import { CallAnalyticsService } from "../../services/call-analytics.service";
import { log } from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import { BestOperatorItem } from "../../types";

@Component({
  selector: 'app-best-operators-card',
  templateUrl: './best-operators-card.component.html',
  styleUrl: './best-operators-card.component.scss'
})
export class BestOperatorsCardComponent implements OnInit {

  constructor(private callAnalyticsService: CallAnalyticsService) {
  }

  operatorRankings: BestOperatorItem[] = [];

  ngOnInit() {
    this.callAnalyticsService.getOperatorRatings().then(response => {
      this.operatorRankings = response.data;
      console.log(response.data)
    }).catch(err => console.log(err));
  }
}
