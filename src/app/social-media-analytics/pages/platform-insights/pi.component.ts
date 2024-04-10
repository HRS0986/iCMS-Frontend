import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content, highlightedComments } from '../../structs';

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
    comment: 'Hit and miss with CodeGenCo. Sometimes it"s a lifesaver, other times it ...',
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
];


@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})


export class PIComponent implements OnInit {
  items!: highlightedComments[];
  selecteditem!: highlightedComments;

  ngOnInit() {
    this.items = itemService;
  }

  onRowEdit(item: highlightedComments) {
  }

  onRowOpen(item: highlightedComments) {
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Platform Insights"}
  ];

  tabFacebook = {title:'Facebook', img: 'assets/social-media/icons/facebook.png'};
  tabInstergram = {title:'Instergram', img: 'assets/social-media/icons/instargram.png'};
  tabTwitter = {title:'Twitter', img: 'assets/social-media/icons/twitter.png'};

  content1: Content = {title: 'Facebook Content'};
  content2: Content = {title: 'Instergram Content'};
  content3: Content = {title: 'Twitter Content'};

}