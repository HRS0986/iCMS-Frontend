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

  viewCampaign(card: any) {
    // Handle the click event, e.g., navigate to a campaign detail page
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
            data: this.campaigns[i].dataSentimentValues,
            fill: false,
            borderColor: '#2391ff',
            borderWidth: 1,
            pointBackgroundColor: "#2391ff",
            pointBorderColor: "#2391ff",
            pointRadius: 1.5,
            tension: 0.2
          }
        ]
      });
    }

  }
}
