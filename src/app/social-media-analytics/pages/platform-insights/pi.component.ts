import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { piPageItem, highlightedComments } from '../../structs';

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
  data1: any;
  data2: any;
  options: any;

  ngOnInit() {
    this.items = itemService;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = {
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

    this.data2 = {
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

    this.options = {
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

  piPageItem1: piPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40};
  piPageItem2: piPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40};
  piPageItem3: piPageItem = { title: '40+ new comments', totalComments: 47, commentsImprovement: -12, totalReactions: 560, reactionsImprovement: +28, HighlightedComments: 40};

  topBarCaption = "Custom Alerts";

}