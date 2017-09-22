 // Purpose:     The shopping cart component will read products from product service variable.  Using rxjs obserabl / subscribe mechanism to
//              retrieve Updated quantity via an observor.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductsService } from '../providers/products.service';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-shoppintcart',
  templateUrl: './shoppintcart.component.html',
  styleUrls: ['./shoppintcart.component.css'],
  providers: [ProductsService]
})
export class ShoppintcartComponent implements OnDestroy {
    public products: Array<any>;
    subscription: Subscription;
    disableCheckout: boolean;

    constructor (private prodSvc: ProductsService, public _router: Router, protected storage: AsyncLocalStorage) {
        this.disableCheckout = true;
        this.products = prodSvc.products;
        this.subscription = this.prodSvc.getProductObservable().subscribe(message => { this.products = message; });
    }

    updateCart(item, mode): void {
        // Send update to subscribers via observable productSubject
        this.prodSvc.updateCartItem(item, mode);
        this.disableCheckout = false;
        console.log('INFO: Selected shopping cart item has been updated.');
    }

    clearMessage(): void {
        // clear observable productSubject
        this.prodSvc.clearMessage();
    }

    checkout() {
        console.log('INFO: Re-Directing to Checkout....');
        this._router.navigate(['checkout']);
    }

    resetDB(whichitem: string) {
        if (whichitem === 'all') {
            // To remove all contents.
            this.storage.clear().subscribe(() => {}, () => {});
            console.log('INFO: All local storage contents cleared');
        } else {
            // Intentionally left the below commented code for reference purpose.
            // To remove specific data set.
            // this.storage.removeItem(whichitem).subscribe(() => {}, () => {});
            // console.log('INFO: Local storage contents of ' + whichitem + ' were cleared.');

            this.storage.setItem('storedProducts', this.prodSvc.products).subscribe(() => {
                console.log('INFO: Local storage has been reset to default product list.')
            }, error => {
                console.log('ERROR: Error resetting Products to local storage.' + error)
            });

        }
        this._router.navigate(['']);
    }


    ngOnDestroy() {
        // This function stores current state of this.products in local storage which will be used by checkout screen.
        this.storage.setItem('storedProducts', this.products).subscribe(() => {
            console.log('INFO: Products stored in local storage.')
        }, error => {
            console.log('ERROR: Error storing Products to local storage.' + error)
        });

        this.subscription.unsubscribe();
    }
}

