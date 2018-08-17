import { StoresComponent } from './../stores/stores.component';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from './../services/stores.service';
import { Component, OnInit } from '@angular/core';
import { Store } from './../store';
import { ProductsService } from '../services/products.service';

declare var $:any;

@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.css']
})
export class AddstoreComponent implements OnInit {

  store: String;
  stores: Store[];
  currentStores: Store[];
  param: String;
  res: Boolean;

  constructor(private storesService: StoresService, private route: ActivatedRoute, private productsService : ProductsService
  , private storesComponent: StoresComponent) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.param = params['name']
    });

    
    (this.getCurrentStores()).then(() => {
      (this.getStores()).then(() => {
        this.stores.forEach(store => {
          this.voegToeAanCombobox(store);
        });
      });
    });

  }

  voegToeAanCombobox(store){
    this.res = false;
    this.currentStores.forEach(currentStore => {
      if(currentStore.name == store.name && currentStore.city == store.city){
        this.res = true;
      }
    });
    if(!this.res){
      $('#stores').append($('<option>', {
        value: store.name,
        text: store.name + ", " + store.city
    }));
    }
  }
  

  async getStores(){
    this.storesService.getStores().subscribe(stores => {
      this.stores = stores;
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 800));
  }

  async getCurrentStores(){
    await this.productsService.getStoresFromProduct(this.param).subscribe(stores => {
      this.currentStores = stores; 
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 800));
  }

  voegWinkelToe(){
    this.productsService.addStoreToProduct($("#stores").find('option:selected').val(), this.param);
    $('.ui.dimmer.addstore').dimmer("hide");
    this.storesComponent.getStores(); 
    this.storesComponent.ngOnInit();
  }

}
