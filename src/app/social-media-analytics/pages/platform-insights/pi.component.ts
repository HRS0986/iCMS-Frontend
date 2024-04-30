import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { piPageItem, highlightedComments } from '../../structs';
import { HttpClient } from '@angular/common/http';

const itemService: highlightedComments[] = [
  {
    id: '1000',
    name: 'Savindu Harshana',
    img: 'assets/social-media/icons/Avatar1.svg',
    comment: 'you"re my coding superhero! All is flawless, and the speed is incredible...',
    company: 'CodeGen',
    company_category: 'Chat Bot',
    sentiment_score: 88,
    color: '#0BB783'
  },
  {
    id: '1001',
    name: 'Dilhara Siriwardana',
    img: 'assets/social-media/icons/Avatar2.svg',
    comment: 'Hit and miss with CodeGenCo. Sometimes it"s a lifesaver, other times`...',
    company: 'VEGA',
    company_category: 'EV Cars Manufac..',
    sentiment_score: 83,
    color: '#0BB783'
  },
  {
    id: '1002',
    name: 'Samitha Liyanage',
    img: 'assets/social-media/icons/Avatar1.svg',
    comment: 'Disappointed with the service. Not worth the investment. Needs significant...',
    company: '--',
    company_category: '',
    sentiment_score: 37,
    color: '#EF6327'
  },
  {
    id: '1003',
    name: 'Dilhara Nethmini',
    img: 'assets/social-media/icons/Avatar2.svg',
    comment: 'tools are okay, but I expected a bit more. Some generated code seems...',
    company: '99x',
    company_category: 'Development Co.',
    sentiment_score: 57,
    color: '#C0F64E'
  },
];


@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})


export class PIComponent implements OnInit {
  items!: highlightedComments[];
  selecteditem!: highlightedComments;
  DataReactions: any;
  DataComments: any;
  DataSentimentOverTime: any;
  DataKeywordThrends: any;
  OptionsSideCards: any;
  OptionsKeywordThrends: any;
  OptionsSentimentOverTime: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.items = itemService;
    let keywordThrendsLabels: string[] = [];
    let keywordThrendsData: any[] = [];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.http.get<any>('http://127.0.0.1:8000/social-media/keyword_trend_count?startDate=2021-01-01&endDate=2021-01-15')
      .subscribe(response => {
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

      },
        error => {
          console.error('Error fetching data:', error);
        });


    this.DataReactions = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: "#fff",
          tension: 0.2
        }
      ]
    };

    this.DataComments = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Second Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "#fff",
          tension: 0.2
        }
      ]
    };

    this.DataSentimentOverTime = {
      labels: ['15-May', '16-May', '17-May', '18-May', '19-May', '20-May', '21-May'],
      datasets: [
        {
          label: 'Reacts',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.2
        },
        {
          label: 'Comments',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.2
        }
      ]
    };

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

  onRowEdit(item: highlightedComments) {
  }

  onRowOpen(item: highlightedComments) {
  }

  breadcrumbItems: MenuItem[] = [
    { label: "Social Media Analytics" },
    { label: "Platform Insights" }
  ];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instergram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  piPageItem1: piPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40 };
  piPageItem2: piPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40 };
  piPageItem3: piPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40 };

  topBarCaption = "Custom Alerts";

}