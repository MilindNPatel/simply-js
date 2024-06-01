import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()

export class ChatService {

    private socket = io(environment.BASE_URL);
    authToken: any;

    joinRoom(data) {
        this.socket.emit('join', data);
    }

    newUserJoined() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('new user joined', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    leaveRoom(data) {
        this.socket.emit('leave', data);
    }

    userLeftRoom() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    sendMessage(data) {
        this.loadToken();
        let msgData = {
            token : this.authToken,
            mData : data
        }
        this.socket.emit('message', msgData);
    }

    newMessageReceived() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
}