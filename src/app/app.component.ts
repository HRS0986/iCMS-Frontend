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
  currentUrl = ""
  isAuthLayout = false;

  constructor(private router: Router, private webSocketService: WebSocketService) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url
          this.isAuthLayout = this.currentUrl.includes("auth");
        }
      })
  }

  ngOnInit() {
    const callWebSocket = this.webSocketService.connect("ws://localhost:8000/ws/notify");
    callWebSocket.onmessage = (event) => {
      console.log("[Call Analytics] ", event.data);
    }

    callWebSocket.onopen = () => {
      console.log("[Call Analytics] Connected to the server");
    }
  }

}
