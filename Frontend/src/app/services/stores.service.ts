import { ConfigService } from './config.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StoresService {

  constructor(private http: Http, private configService: ConfigService) { }

  addNewStore(store){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.configService.getLink() + '/stores/add', store, {headers: headers}).subscribe();
  }

  getStores(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.configService.getLink() + '/stores', {headers: headers})
    .map(res => res.json());
  }

}
