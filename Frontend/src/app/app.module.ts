import { ProductsService } from './services/products.service';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StoresComponent } from './stores/stores.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreComponent } from './store/store.component';
import { NewstoreComponent } from './newstore/newstore.component';
import { StoresService } from './services/stores.service';
import { AddstoreComponent } from './addstore/addstore.component';
import { ConfigService } from './services/config.service';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'products/:name', component: StoresComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    StoresComponent,
    NavbarComponent,
    StoreComponent,
    NewstoreComponent,
    AddstoreComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [ApiService, ValidateService, AuthService, ProductsService, StoresService, StoresComponent, ConfigService], 
  bootstrap: [AppComponent]

})
export class AppModule { }
