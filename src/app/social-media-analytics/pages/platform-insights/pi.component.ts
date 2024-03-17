import { Component } from '@angular/core';
import { Content } from '../../structs';
import { MenuItem } from "primeng/api";


@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})


export class PIComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Platform Insights"}
  ];

  tab1 = {title:'Facebook', img: 'assets/social-media/icons/facebook.png'};
  tab2 = {title:'Instergram', img: 'assets/social-media/icons/instargram.png'};
  tab3 = {title:'Twitter', img: 'assets/social-media/icons/twitter.png'};

  content1: Content = {title: 'Facebook Content'};
  content2: Content = {title: 'Instergram Content'};
  content3: Content = {title: 'Twitter Content'};

}