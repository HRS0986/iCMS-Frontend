import {Component, Input} from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  tabs: { title: string, content: string }[] = [];
  breadcrumbItems: MenuItem[] = [
    {label: "Profile"}
  ];


  ngOnInit() {
    this.tabs = [
      { title: "Edit Profile", content: "Edit Profile" },
      { title: "Notifications", content: "Notification Settings"},
      { title: "Security", content: "Security Settings"}
    ];
  }


}
