import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;

  constructor() { }

  public connect(): void {
    this.socket = new WebSocket("ws://localhost:8000/ws/notify");

    this.socket.onopen = () => {
      console.log("Connected to the server");
    };

    this.socket.onmessage = (event) => {
      console.log(event.data);
    };

    this.socket.onclose = () => {
      console.log("Disconnected from the server");
    };

    this.socket.onerror = (error) => {
      console.error(error);
    };
  }

  public disconnect(): void {
    this.socket.close();
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }
}
