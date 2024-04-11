import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Content } from '../../structs';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss']
})
export class CAComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Campaign Analysis"}
  ];

  tabFacebook = { title: 'Facebook', img: 'assets/social-media/icons/facebook.png' };
  tabInstergram = { title: 'Instergram', img: 'assets/social-media/icons/instargram.png' };
  tabTwitter = { title: 'Twitter', img: 'assets/social-media/icons/twitter.png' };

  caPageItem1: Content = {title: 'Facebook Content'};
  caPageItem2: Content = {title: 'Instergram Content'};
  caPageItem3: Content = {title: 'Twitter Content'};

  topBarCaption = "Custom Campaigns";

}