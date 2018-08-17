import { StoresComponent } from './../stores/stores.component';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private storesComponent: StoresComponent) { }

  ngOnInit(){
  }

  toonAddStore(){
      $('.ui.dimmer.newstore').dimmer("toggle");
  }

  toonLogin(){
    $('.ui.dimmer.login').dimmer("toggle");
}

toonRegister(){
   $('.ui.dimmer.register').dimmer("toggle");
  }

}
