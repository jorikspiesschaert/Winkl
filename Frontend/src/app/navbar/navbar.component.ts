import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.initJquery();
  }


  ngAfterViewChecked() {
    this.initJquery();
 
   }

  initJquery(){
    $('#showLogin').click(function(){
      $('.ui.dimmer.login').dimmer("toggle");
   });
   $('#showRegister').click(function(){
     $('.ui.dimmer.register').dimmer("toggle");
  });
  }

}
