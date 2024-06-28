import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { PiPageItem } from '../../models/platform-insights';
import { PlatformInsightsApiService } from '../../services/platform-insights-api.service';
import { ModalAddNewCampaignComponent } from '../../components/Modals/modal-add-new-campaign/modal-add-new-campaign.component';
import { ModalSetAlertComponent } from '../../components/Modals/modal-set-alert/modal-set-alert.component';
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
    let SentimentOverTimeSubCommentsData: any[] = [];
    let SentimentOverTimeCommentsData: any[] = [];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.platformInsightsApiService.getKeywordTrendCount("2024-05-01", "2024-07-30").subscribe(response => {
      console.log(response);

      // ############ 0: Keyword Trends ############

      const keyword_trends = response;

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
    });

    this.platformInsightsApiService.getTotalReactions("2024-05-01", "2024-07-30").subscribe(response => {
      console.log(response);

      // ############ 1: Get total reactions of posts ############

      const total_reactions = response;

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
    });

    this.platformInsightsApiService.getTotalComments("2024-05-01", "2024-07-30").subscribe(response => {
      console.log(response);

      // ############ 2: Get total comments of posts ############

      const total_comments = response;

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
    });

    this.platformInsightsApiService.getHighlightedComments("2024-05-01", "2024-07-30").subscribe(response => {
      console.log(response);

      // ############ 3: Get Highlighted comments ############

      const highlighted_comments = response;
      highlighted_comments.forEach((item: any) => {
        if (item.description.length > 100) {
          item.description = item.description.slice(0, 150) + '...';
        }
        item.s_score = Math.round((item.s_score + 1) * 50);
      });
      this.items = highlighted_comments;
    });

    this.platformInsightsApiService.getAverageSentimentScore("2024-05-01", "2024-07-30").subscribe(response => {
      console.log(response);

      // ############ 4: Get average sentiment score of comments and reacts ############

      const sentiment_scores = response;

      for (const [key, value] of Object.entries(sentiment_scores.comments)) {
        SentimentOverTimeLabels.push(key);
        SentimentOverTimeCommentsData.push(value);
      }

      for (const [key, value] of Object.entries(sentiment_scores.subcomments)) {
        SentimentOverTimeSubCommentsData.push(value);
      }

      this.DataSentimentOverTime = {
        labels: SentimentOverTimeLabels,
        datasets: [
          {
            label: 'Sub Comments',
            data: SentimentOverTimeSubCommentsData,
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