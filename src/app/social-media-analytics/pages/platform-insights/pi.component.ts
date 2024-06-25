import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { PiPageItem } from '../../models/platform-insights';
import { PlatformInsightsApiService } from '../../services/platform-insights-api.service';
import { ModalAddNewCampaignComponent } from '../../components/Modals/modal-add-new-campaign/modal-add-new-campaign.component';

@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})

export class PIComponent implements OnInit {
  items: any;
  DataReactions: any;
  DataComments: any;
  DataSentimentOverTime: any;
  DataKeywordThrends: any;
  OptionsSideCards: any;
  OptionsKeywordThrends: any;
  OptionsSentimentOverTime: any;

  constructor(private platformInsightsApiService: PlatformInsightsApiService) { }

  ngOnInit() {
    let keywordThrendsLabels: string[] = [];
    let keywordThrendsData: any[] = [];

    let totalReactionsLabels: string[] = [];
    let totalReactionsData: any[] = [];

    let totalCommentsLabels: string[] = [];
    let totalCommentsData: any[] = [];

    let SentimentOverTimeLabels: string[] = [];
    let SentimentOverTimeReactsData: any[] = [];
    let SentimentOverTimeCommentsData: any[] = [];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.platformInsightsApiService.getPIData("2024-05-01", "2024-05-30").subscribe(response => {
      console.log(response);

      // ############ 0: Keyword Trends ############

      const keyword_trends = response[0];

      for (const [key, value] of Object.entries(keyword_trends)) {
        keywordThrendsLabels.push(key);
        keywordThrendsData.push(value);
      }

      this.DataKeywordThrends = {
        labels: keywordThrendsLabels,
        datasets: [
          {
            data: keywordThrendsData,
            backgroundColor: ['rgba(255, 159, 64, 0.4)', 'rgba(75, 192, 192, 0.4)', 'rgba(54, 162, 235, 0.4)', 'rgba(153, 102, 255, 0.4)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 1
          }
        ]
      };


      // ############ 1: Get total reactions of posts ############

      const total_reactions = response[1];

      for (const [key, value] of Object.entries(total_reactions)) {
        totalReactionsLabels.push(key);
        totalReactionsData.push(value);
      }

      this.DataReactions = {
        labels: totalReactionsLabels,
        datasets: [
          {
            label: 'Reactions',
            data: totalReactionsData,
            fill: false,
            borderColor: "#fff",
            tension: 0.2
          }
        ]
      };


      // ############ 2: Get total comments of posts ############

      const total_comments = response[2];

      for (const [key, value] of Object.entries(total_comments)) {
        totalCommentsLabels.push(key);
        totalCommentsData.push(value);
      }

      this.DataComments = {
        labels: totalCommentsLabels,
        datasets: [
          {
            label: 'Comments',
            data: totalCommentsData,
            fill: false,
            borderColor: "#fff",
            tension: 0.2
          }
        ]
      };


      // ############ 3: Get Highlighted comments ############

      const highlighted_comments = response[3];
      highlighted_comments.forEach((item: any) => {
        if (item.description.length > 100) {
          item.description = item.description.slice(0, 150) + '...';
        }
        item.s_score = Math.round((item.s_score + 1) * 50);
      });
      this.items = highlighted_comments;


      // ############ 4: Get average sentiment score of comments and reacts ############

      const sentiment_scores = response[4];

      for (const [key, value] of Object.entries(sentiment_scores.comment_sentiment_scores)) {
        SentimentOverTimeLabels.push(key);
        SentimentOverTimeCommentsData.push(value);
      }

      for (const [key, value] of Object.entries(sentiment_scores.post_sentiment_scores)) {
        SentimentOverTimeReactsData.push(value);
      }

      this.DataSentimentOverTime = {
        labels: SentimentOverTimeLabels,
        datasets: [
          {
            label: 'Reacts',
            data: SentimentOverTimeReactsData,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.2
          },
          {
            label: 'Comments',
            data: SentimentOverTimeCommentsData,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            tension: 0.2
          }
        ]
      };

    },
      error => {
        console.error('Error fetching data:', error);
      });


    this.OptionsKeywordThrends = {
      maintainAspectRatio: false,
      aspectRatio: 0.65,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.OptionsSideCards = {
      maintainAspectRatio: false,
      aspectRatio: 2,
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

    this.OptionsSentimentOverTime = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  onRowEdit(item: any) {
  }

  onRowOpen(item: any) {
  }

  breadcrumbItems: MenuItem[] = [
    { label: "Social Media Analytics" },
    { label: "Platform Insights" }
  ];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instergram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  piPageItem1: PiPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40 };
  piPageItem2: PiPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40 };
  piPageItem3: PiPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40 };

  topBarCaption = "Custom Alerts";

}