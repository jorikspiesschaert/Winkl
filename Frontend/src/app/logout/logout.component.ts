import { StoresComponent } from './../stores/stores.component';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private storesComponent: StoresComponent) { }

  ngOnInit() {
  }

  uitloggen(){
    this.authService.logout();
    this.storesComponent.admin = false;
    this.storesComponent.ngOnInit();
  }

}
