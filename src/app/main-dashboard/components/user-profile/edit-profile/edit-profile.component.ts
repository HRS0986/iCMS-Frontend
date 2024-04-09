import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Profile"},
    {label: "Edit Profile"}
  ];
}
