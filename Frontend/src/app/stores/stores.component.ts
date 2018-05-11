import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Store } from './../store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers: [ProductsService]
})
export class StoresComponent implements OnInit {
  stores: Store[]
  param: String
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['name']
    });

    this.productService.getStoresFromProduct(this.param).subscribe(stores => {
      this.stores = stores
    });

  }

}
