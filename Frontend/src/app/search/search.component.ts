import { Product } from './../product';
import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ProductsService]
})
export class SearchComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      var content = []
    this.products.forEach(item => {
      content.push({title: item.name, url: 'products/' + item.name})
    });
    $('.ui.search').search({
      source:content
    });
    });

    
  }

}
