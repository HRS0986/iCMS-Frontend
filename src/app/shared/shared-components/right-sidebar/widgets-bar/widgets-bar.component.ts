import { Component } from '@angular/core';

@Component({
  selector: 'app-widgets-bar',
  templateUrl: './widgets-bar.component.html',
  styleUrl: './widgets-bar.component.scss'
})
export class WidgetsBarComponent {
  sidebarVisible: boolean;

  constructor() {
    this.sidebarVisible = false;
  }

}
