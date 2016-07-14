import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PriceTypes, qarray} from '../PriceBoard/pricetypes';


@Injectable()
export class BOMService {
    //private uri = 'https://crest-tq.eveonline.com/regions/';
    //https://api-sisi.testeveonline.com/market/10000002/orders/all/  << gives all market orders

    //public regionid: string;

    public q2: Array<qarray>;
    private pt: PriceTypes[];

    constructor(private http: Http) { }
    getPriceData(regionid: string, typeid: number): Observable<PriceTypes> {
        let uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        console.log('URI for price data' + uri);
        return this.http.get(uri).map((res: Response) => res.json());
    }


}
