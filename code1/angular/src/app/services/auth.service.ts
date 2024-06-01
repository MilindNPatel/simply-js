import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;
  userData: any;

  constructor(private http: Http) {
      this.isDev = true;  // Change to false before deployment
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = environment.BASE_URL + 'users/register';
    return this.http.post(url, user, {headers: headers})
      .map(res => res.json());
  }

  updateProfile(user) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let url = environment.BASE_URL + 'users/updateprofile/'+this.userData.id;
    return this.http.post(url, user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = environment.BASE_URL + 'users/authenticate';
    return this.http.post(url, user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    this.loadUser();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let url = environment.BASE_URL + 'users/getprofile/'+this.userData.id;
    return this.http.get(url, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getQuoteList(quote) {
    let headers = new Headers();
    this.loadToken();    
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let url = environment.BASE_URL + 'stocks/getList/' + quote;
    return this.http.get(url, {headers: headers})
      .map(res => res.json());
  }

  subscribeScript(para){
    this.loadUser();
    let params = {
      userId : this.userData.id,
      userName : this.userData.username,
      stockId : para._id,
      symbol : para.symbol
    }
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let url = environment.BASE_URL + 'stocks/subscribestock';
    return this.http.post(url, params, {headers: headers}).map(res => 
      res.json()
    );
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser(){
    const tempUser = JSON.parse(localStorage.getItem('user'));
    this.userData = tempUser;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
