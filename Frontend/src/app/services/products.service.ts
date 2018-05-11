import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ProductsService {

  constructor(private http : Http) { }

  getProducts(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/products', {headers: headers})
    .map(res => res.json());
  }

  getStoresFromProduct(product){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/products/' + product + '/stores', {headers: headers})
    .map(res => res.json());
  }

}
