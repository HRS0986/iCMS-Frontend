import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ca-cards',
  templateUrl: './ca-cards.component.html',
  styleUrls: ['./ca-cards.component.scss']
})
export class CaCardsComponent implements OnInit {
  OptionsSideCards: any;
  DataSentiments: any[] = [];
  @Input() campaigns: any[] = [];
  @Input() showAdditionalCards: boolean = false;
  @Input() loading: boolean = true;

  viewCampaign(card: any) {
    window.open(card.post_url, '_blank');
  }

  ngOnInit() {
    this.OptionsSideCards = {
      maintainAspectRatio: false,
      aspectRatio: 3.5,
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10
        }
      },
      hover: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      plugins: {
        legend: {
          display: false
        },
      },
    };

    for (let i = 0; i < this.campaigns.length; i++) {
      this.DataSentiments.push({
        labels: this.campaigns[i].dataSentimentLabels,
        datasets: [
          {
            label: 'Sentiments',
            data: this.campaigns[i].s_score_arr,
            fill: false,
            borderColor: this.campaigns[i].color,
            borderWidth: 1.5,
            pointBackgroundColor: this.campaigns[i].color,
            pointBorderColor: this.campaigns[i].color,
            pointRadius: 2,
            tension: 0.2
          }
        ]
      });
    }

  }
}
