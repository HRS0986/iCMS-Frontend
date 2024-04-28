import { Component } from '@angular/core';

@Component({
  selector: 'app-add-member-bar',
  templateUrl: './add-member-bar.component.html',
  styleUrl: './add-member-bar.component.scss'
})
export class AddMemberBarComponent {
  sidebarVisible: boolean;

    constructor() {
      this.sidebarVisible = false;
    }


}
