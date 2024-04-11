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

  tab1 = {title:'Facebook', img: 'assets/social-media/icons/facebook.png'};
  tab2 = {title:'Instergram', img: 'assets/social-media/icons/instargram.png'};
  tab3 = {title:'Twitter', img: 'assets/social-media/icons/twitter.png'};

  content1: Content = {title: 'Facebook Content'};
  content2: Content = {title: 'Instergram Content'};
  content3: Content = {title: 'Twitter Content'};

}