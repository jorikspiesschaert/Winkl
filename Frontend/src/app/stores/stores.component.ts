import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Store } from './../store';
import { AuthService } from './../services/auth.service';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers: [ProductsService]
})
export class StoresComponent implements OnInit {
  stores: Store[];
  param: String;
  admin: Boolean;
  dataAvailable : Boolean = false
  constructor(private productService: ProductsService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.hideMessage();
    this.loadAdmin();

    this.route.params.subscribe(params => {
      this.param = params['name']
    });

    (this.getStores()).then(() => {
      this.favoStores();
    });
  }

  showMessage(){
    $(".foutStores").empty();
    $(".foutStores").append('<div class="ui red message">Je kan geen favorieten toevoegen, want je bent niet ingelogd.</div>');
  }

  hideMessage(){
    $(".foutStores").empty();
  }

  showAdd(){
      $('.ui.dimmer.addstore').dimmer("toggle");
  }

  loadAdmin(){
    this.authService.isAdmin().subscribe(res => {
      this.admin = res.isAdmin;
    });
  }
  

  async getStores(){
    await this.productService.getStoresFromProduct(this.param).subscribe(stores => {
      this.stores = stores; 
      this.dataAvailable = true;
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 800));
  }

  async favoStores(){
    if(this.authService.loggedIn()){
      if(this.dataAvailable){
      this.stores.forEach(store => {
        this.authService.isFavoStore(store).subscribe(res => {
          res.forEach(item => {
            if(store._id == item){
              store.fav = true;
            }
          });
    
        });
      });
      }
    }
  }

}
