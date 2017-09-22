// Purpose: Serivce to update product quantity and calculate the total base price and return it as asObservable.
//          Ideal way of getting the products must be via an products endpoint and defining a structure in typescript model
//          as defined in model/products.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductsService {

    public products: Array<any>;
    public productSubject = new Subject<any>();

    constructor() {

        this.products = [
          {id: 'Peas' , desc: 'Peas', baseCurrency: 'USD', baseRate: 0.95, perQuantity: 'Bag', basketQuantity: 0, total: 0},
          {id: 'Eggs' , desc: 'Eggs', baseCurrency: 'USD', baseRate: 2.10, perQuantity: 'Dozen', basketQuantity: 0, total: 0},
          {id: 'Milk' , desc: 'Milk', baseCurrency: 'USD', baseRate: 1.30, perQuantity: 'Bottle', basketQuantity: 0, total: 0},
          {id: 'Beans' , desc: 'Beans', baseCurrency: 'USD', baseRate: 0.73, perQuantity: 'Can', basketQuantity: 0, total: 0},
          {id: 'Carrots' , desc: 'Carrots', baseCurrency: 'USD', baseRate: 0.88, perQuantity: 'Kg', basketQuantity: 0, total: 0}
        ];
    }

    updateCartItem(item: string, mode: string) {

        const currentQuantity = this.products.find(v => v.id === item).basketQuantity;
        const baseRate = this.products.find(v => v.id === item).baseRate;

        let newTotal;
        const newQuantity = (mode === 'add') ? (currentQuantity + 1) : ((mode === 'remove') ? (currentQuantity - 1) : 0);

        if (newQuantity >= 0) {
            newTotal = baseRate * newQuantity;
            newTotal = newTotal.toFixed(2);
            const localItem = this.products.find(v => v.id === item);

            localItem.basketQuantity = newQuantity;
            this.products.find(v => v.id === item, localItem);

            this.products.find(v => v.id === item).basketQuantity = newQuantity;
            this.products.find(v => v.id === item).total = newTotal;
            this.productSubject.next(this.products);
        }
    }

    clearMessage() {
        // Clear the product subject observable.
        this.productSubject.next();
    }

    getProductObservable(): Observable<any> {
        // Return the product subject observable string stream
        return this.productSubject.asObservable();
    }
}
