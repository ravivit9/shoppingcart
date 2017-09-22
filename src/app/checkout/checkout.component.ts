
// Purpose:    This component will retrieve current exchange rates from currencylayer website and calculate the total payable
//             amount with respect to the basket quantity for the requested currencies.

import { Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import { RatesService } from '../providers/rates.service';
import { ProductsService } from '../providers/products.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
    providers: [ RatesService]
})
export class CheckoutComponent implements OnInit {
    public products: Array<any>;
    error: any;
    public allRates: any;

  constructor(private prodSvc: ProductsService, public rateSvc: RatesService, protected storage: AsyncLocalStorage) {}

    loadRates() {
        // Get all rates
        this.rateSvc.getRates().subscribe(snapshot => {
            if (snapshot['success'] === false) {
                this.error = 'ERROR: (' + snapshot['error']['code'] + ') : ' +  snapshot['error']['info'];
            } else {
                const quotes = snapshot['quotes'];
                const ratesArray = [];
                Object.keys(quotes).forEach(function(currentKey) {
                    ratesArray.push(
                        {
                            baseCurrency: currentKey.substring(0, 3),
                            currency: currentKey.substring(3),
                            rate: quotes[currentKey]
                        }
                    )
                });
                this.allRates = ratesArray;
                this.loadProductsFromDB();
            }
        },
        err => { console.log('ERROR: Unknown error occured while retrieving rate quotes.' + err);
         });
    }

    loadProductsFromDB() {
        this.storage.getItem('storedProducts').subscribe((prod) => {
            if (prod != null) {
                this.products = prod;
                this.calculateSum();
            }
        },
        err => {
            console.log('ERROR: Error occured while retrieving stored products from local database.' + err);
        });
    }

    calculateSum () {
        let totalQuantity = 0;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i]['basketQuantity'] > 0) {
                totalQuantity += this.products[i]['basketQuantity'];
            }
        }

        for (let j = 0; j < this.allRates.length; j++) {
            this.allRates[j]['total'] = (totalQuantity * this.allRates[j].rate).toFixed(2) ;
        }
    }
    ngOnInit() {
        // Load rates
        this.loadRates();
    }
}
