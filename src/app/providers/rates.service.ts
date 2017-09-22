import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Rates } from '../model/rates';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RatesService {
    private key =  '575bd314b0eb9c2380970d3e232704d2';
    private url = 'http://apilayer.net/api/live?access_key=';
    private currencies = 'EUR,GBP,CAD,PLN';
    private source = 'USD';
    private ratesEndpoint = this.url + this.key + '&currencies=' + this.currencies + '&source=' + this.source + '&format=1';
    public rates: any;

    constructor(private http: Http) {}

      getRates(): Observable<Array<Rates>> {
          this.rates = this.http.get(this.ratesEndpoint)
                // and calling .json() on the response to return data
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
          return this.rates;
      }
}
