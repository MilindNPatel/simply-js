import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()

export class QuotesService {

    private socket = io(environment.BASE_URL);

    userData;
    authToken;

    constructor() {
        // this.userData = JSON.parse(localStorage.getItem('user'));        
    }

    subscributionReceived() {  
        this.loadUser();
        this.loadToken();
        let params = {
          userId : this.userData.id,
          userName : this.userData.username,       
          token : this.authToken
        }   
        this.socket.emit('userData', params);      
        let observable = new Observable(observer => {            
            this.socket.on('subscribedData', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    newQuotesReceived() {        
        let observable = new Observable(observer => {            
            this.socket.on('scriptData', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    } 

    subscribeScript(para){        
    this.loadUser();
    this.loadToken();
    let params = {
      userId : this.userData.id,
      userName : this.userData.username,
      stockId : para._id,
      symbol : para.symbol,
      regularMarketPrice : para.regularMarketPrice,
      token : this.authToken
    }    
    this.socket.emit('subscribeScript', params);
    let observable = new Observable(observer => {            
            this.socket.on('subscribeScript', (data) => {
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

  loadUser(){
    const tempUser = JSON.parse(localStorage.getItem('user'));
    this.userData = tempUser;
  }

  trade(para){        
    this.loadUser();
    this.loadToken();
    let params = {
      userId : this.userData.id,
      userName : this.userData.username,
      symbol : para.symbol,
      currentPrice : para.currentPrice,      
      limitPrice : para.limitPrice,
      quantity : para.qty,
      type : para.type,
      status : para.status,
      token : this.authToken
    }    
    this.socket.emit('trade', params);
    let observable = new Observable(observer => {            
            this.socket.on('trade', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
  }

}
