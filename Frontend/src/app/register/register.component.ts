import { ValidateService } from './../services/validate.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  firstname: String;
  lastname: String;
  password: String;
  email: String;

  constructor(private validateService: ValidateService, private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    const user = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      password: this.password,
      email: this.email
    }

    if(!this.validateService.validateRegister(user)){
      $(".fout").empty();
      $(".fout").append('<div class="ui red message">Gelieve alle gegevens in te vullen</div>');
      return false;
    }
    else if(!this.validateService.validateEmail(user.email)){
      $(".fout").empty();
      $(".fout").append('<div class="ui red message">Gelieve een geldig e-mail adres op te geven</div>');
      return false;
    }

    this.authService.registreerUser(user).subscribe(data => {
      if(data.success){
        console.log('gelukt');
          $('.ui.dimmer.register').dimmer("hide")

      }else {
        console.log('mislukt');
      }
    });
  }

}
