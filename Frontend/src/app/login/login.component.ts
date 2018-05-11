import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  inloggen(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticeerUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        $('.ui.dimmer.login').dimmer("hide");
      }else {
        $(".fout").empty();
        $(".fout").append('<div class="ui red message">Foutief wachtwoord en/of gebruikersnaam</div>');
      }
    }); 

  }
}
