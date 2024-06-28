import {Component} from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  activeIndex: number = 0;
  //create string array to store tab title and content
  list: string[] = ["Edit Profile", "Notification Settings", "Security"];

  tabs: { title: string; content: string }[] = [];
  breadcrumbItems: MenuItem[] = [
    {label: "Profile"},
    {label: this.list[this.activeIndex]}
  ];

  ngOnInit() {
    this.tabs = [
      { title: "Edit Profile", content: "Edit Profile" },
      // { title: "Notifications", content: "Notification Settings"},
      { title: "Security", content: "Security Settings"}
    ];
  }


  clickTab(event: any) {
    this.breadcrumbItems = [
      {label: "Profile"},
      {label: this.list[this.activeIndex]}
    ];
  }
}
