import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { WebSocketService } from "./shared/shared-services/web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'iCMS-Frontend';
  currentUrl = "";
  isAuthLayout = false;

  constructor(private router: Router, private webSocketService: WebSocketService) {
    this.webSocketService.connect("ws://localhost:8000/ws/notify");
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url
          this.isAuthLayout = this.currentUrl.includes("auth");
        }
      });
  }

  ngOnInit() {
    // this.webSocketService.sendMessage("Hello from the client!");
  }

}
