import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(){
  }


  toonLogin(){
      $('.ui.dimmer.login').dimmer("toggle");
  }

  toonRegister(){
     $('.ui.dimmer.register').dimmer("toggle");
  }


}
