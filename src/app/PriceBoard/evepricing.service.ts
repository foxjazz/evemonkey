import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PriceTypes} from './pricetypes';

@Injectable()
export class EvePricingService {
    //private uri = 'https://crest-tq.eveonline.com/regions/';
    //https://api-sisi.testeveonline.com/market/10000002/orders/all/  << gives all market orders
    private uri: string;
    //public regionid: string;
    //public typehref: string;
    constructor(private http: Http) { }
    getPriceData(regionid: string, typeid: number): Observable<PriceTypes> {
        this.uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        console.log('URI for price data' + this.uri);
        return  this.http.get(this.uri)
            .map((res: Response) => res.json());

       /* let newresult: Observable<ItemTypesA> = new Observable<ItemTypesA>();
        let i: number = 0;
        
        return newresult;*/
    }
   /* getSystems(id: string): Observable<ISystems> {
        this.uriSys = 'https://crest-tq.eveonline.com/market/' + id + '/orders/sell/?type=https://crest-tq.eveonline.com/types/34/';
        return this.http.get(this.uriSys)
            .map((res: Response) => res.json());

    }*/
    //https://crest-tq.eveonline.com/market/10000002/orders/sell/?type=https://crest-tq.eveonline.com/types/34/
}