 /* =================== Angular Module Imports ============================= */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

 /*=================== Material Design Imports ============================ */
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 /* ==================== Component Imports ==================================== */
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppintcartComponent } from './shoppintcart/shoppintcart.component';
import { ProductsService } from './providers/products.service';

// For simplicity for this exercise routes are defined here otherwise module wise routes are preferred.
 const routes: Routes = [
     { path: '', component: AppComponent},
     { path: 'shoppingcart', component: ShoppintcartComponent},
     { path: 'checkout', component: CheckoutComponent},
     { path: '', redirectTo: '', pathMatch: 'full' }
 ];


@NgModule({
    declarations: [ AppComponent, CheckoutComponent, ShoppintcartComponent],
    imports: [ BrowserModule, FormsModule, HttpModule, MaterialModule, BrowserAnimationsModule, AsyncLocalStorageModule, RouterModule.forRoot(routes) ],
    bootstrap: [ AppComponent ],
    providers: [ProductsService ]
})
export class AppModule { }
