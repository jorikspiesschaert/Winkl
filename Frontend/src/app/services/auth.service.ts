import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  winkels: any;

  constructor(private http : Http, private configService: ConfigService) { }

  addFavoStore(store){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.http.post(this.configService.getLink() + '/users/addStore', {"user" : this.user, "store" : store}, {headers: headers}).subscribe();
  }

  delFavoStore(store){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.http.post(this.configService.getLink() + '/users/delStore', {"user" : this.user, "store" : store}, {headers: headers}).subscribe();
  }

  isFavoStore(store){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.http.post(this.configService.getLink() + '/users/getStores', {"user" : this.user }, {headers: headers})
    .map(res => res.json());
  }


  registreerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.configService.getLink() + '/users/register', user, {headers: headers})
    .map(res => res.json());
  }

  authenticeerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.configService.getLink() + '/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type','application/json');
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.http.post(this.configService.getLink() + '/users/profile', {"user" : this.user},  {headers: headers})
    .map(res => res.json());
  }

  isAdmin(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type','application/json');
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.http.post(this.configService.getLink() + '/users/isAdmin', {"user" : this.user},  {headers: headers})
    .map(res => res.json());
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
