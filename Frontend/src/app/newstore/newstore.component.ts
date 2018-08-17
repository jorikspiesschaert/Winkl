import { ValidateService } from './../services/validate.service';
import { StoresService } from './../services/stores.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-newstore',
  templateUrl: './newstore.component.html',
  styleUrls: ['./newstore.component.css']
})
export class NewstoreComponent implements OnInit {

  name: String;
  street: String;
  number: String;
  city: String;
  food: Boolean;
  bancontact: Boolean;
  sunday: Boolean;


  constructor(private storesService: StoresService, private validateService: ValidateService) { }

  ngOnInit() {
    $('.ui.checkbox').checkbox();
  }

  voegWinkelToe(){
    if(this.food == undefined){
      this.food = false;
    }
    if(this.bancontact == undefined){
      this.bancontact = false;
    }
    if(this.sunday == undefined){
      this.sunday = false;
    }
    const store = {
      name: this.name,
      street: this.street,
      number: this.number,
      city: this.city,
      food: this.food,
      bancontact: this.bancontact,
      sunday: this.sunday
    }

    if(this.validateService.validateNewStore(store)){
      this.storesService.addNewStore(store);
      $('.ui.dimmer.newstore').dimmer("hide");
    }else{
      $(".fout").empty();
      $(".fout").append('<div class="ui red message">Gelieve alle gegevens in te vullen!</div>');
    }

  }

}
