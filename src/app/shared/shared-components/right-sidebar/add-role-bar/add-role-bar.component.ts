import { Component } from '@angular/core';

@Component({
  selector: 'app-add-role-bar',
  templateUrl: './add-role-bar.component.html',
  styleUrl: './add-role-bar.component.scss'
})
export class AddRoleBarComponent {
  sidebarVisible: boolean;

  constructor() {
    this.sidebarVisible = false;
  }


}
