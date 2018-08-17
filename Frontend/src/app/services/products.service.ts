import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ProductsService {

  constructor(private http : Http, private configService: ConfigService) { }

  getProducts(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.configService.getLink() + '/products', {headers: headers})
    .map(res => res.json());
  }

  getStoresFromProduct(product){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.configService.getLink() + '/products/' + product + '/stores', {headers: headers})
    .map(res => res.json());
  }

  addStoreToProduct(store, product){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.configService.getLink() + '/products/addStore', {"product" : product, "store" : store}, {headers: headers}).subscribe();
  }

}
