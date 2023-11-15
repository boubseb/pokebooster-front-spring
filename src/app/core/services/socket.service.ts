import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  onEvent(event: string) {
    return this.socket.fromEvent(event);
  }

  emitEvent(event: string, data?: any) {
    this.socket.emit(event, data);
  }
}