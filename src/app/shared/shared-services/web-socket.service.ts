import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;

  constructor() { }

  public connect(webSocketUrl: string): void {
    this.socket = new WebSocket(webSocketUrl);

    this.socket.onopen = () => {
      console.log("Connected to the server");
    };

    // You can override this
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

  public disconnect(socket: WebSocket): void {
    socket.close();
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }
}
