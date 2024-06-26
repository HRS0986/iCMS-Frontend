import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { messaging } from "../configs/firebase.config";
import { environment } from "../environment/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'iCMS-Frontend';
  currentUrl = ""
  isAuthLayout = false;

  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url
          this.isAuthLayout = this.currentUrl.includes("auth");
        }
      })
  }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    navigator.serviceWorker.addEventListener('backgroundMessage', function(event) {
      console.log('Received a message from service worker: ', event);
    });
  }

  requestPermission() {
    messaging.getToken({vapidKey: environment.firebaseConfig.vapidKey})
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log(err);
    });
  }

  listen() {
    navigator.serviceWorker.ready.then((registration) => {
      messaging.onMessage((payload) => {
        console.log('Foreground message received: ', payload);
      });
    });
  }

}
