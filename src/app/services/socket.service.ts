import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;
  constructor() { }

  connect(): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  userConnected(username: string): void {
    this.socket.emit('userConnected', username);
  }

  userDisconnected(): void {
    this.socket.emit('userDisconnected');
  }

  messageSent(message: any): void {
    this.socket.emit('messageSent', message);
  }

  onUsersUpdated(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('usersUpdated', (data) => {
        observer.next(data);
      });
    });
  }

  onMessageReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (data) => {
        observer.next(data);
      });
    });
  

}


}
