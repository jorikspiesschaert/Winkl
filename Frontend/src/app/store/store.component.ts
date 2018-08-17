import { StoresComponent } from './../stores/stores.component';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from './../store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @Input() store : Store;

  constructor(private authService: AuthService, private storesComponent: StoresComponent) { }

  ngOnInit() {
    }

  changeFav(){
    if(this.authService.loggedIn()){
    this.store.fav = !this.store.fav;
    if(this.store.fav){
      this.authService.addFavoStore(this.store);
    }else{
      this.authService.delFavoStore(this.store);
    }
  }else{
    this.storesComponent.showMessage();
  }
  }
}
