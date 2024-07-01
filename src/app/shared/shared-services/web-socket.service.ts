import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;

  constructor() { }

  public connect(webSocketUrl: string): WebSocket {
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

    return this.socket;
  }

  public disconnect(socket: WebSocket): void {
    socket.close();
  }

  public sendMessage(socket: WebSocket, message: string): void {
    socket.send(message);
  }
}
