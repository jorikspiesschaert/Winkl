import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  getLink(){
    return "http://localhost:3000";
  }

}
