import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PriceTypes,qarray} from './pricetypes';


@Injectable()
export class EvePricingService {
    //private uri = 'https://crest-tq.eveonline.com/regions/';
    //https://api-sisi.testeveonline.com/market/10000002/orders/all/  << gives all market orders
    
    //public regionid: string;
    
    public q2: Array<qarray>;
    private pt: PriceTypes[];
    
    constructor(private http: Http) { }
    getPriceData(regionid: string, typeid: number): Observable<PriceTypes> {
        let uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        console.log('URI for price data' + uri);
        return  this.http.get(uri).map((res: Response) => res.json());
    }

    getPriceDataUri(uri: string, qx: qarray): Observable<PriceTypes> {
        let today = new Date();
        let sec = today.getSeconds();
        let ms = today.getMilliseconds();
        console.log(sec + ':' + ms + ' URI for price data' + uri);
        return this.http.get(uri).map((res: Response) => {
            let p1: PriceTypes;
            p1 = res.json();
            p1.region = qx.regionName;
            p1.typeName = qx.typeName;
            p1.station = qx.stationName;
            return p1;
        });
    }

    getPriceData2(): Observable<PriceTypes[]> {
        let pt = new Array<PriceTypes>();
        return Observable.from(this.q2)
            .flatMap(t => this.getPriceDataUri(t.uri,t))
            .toArray()
            .do((result: PriceTypes[]) => {
                pt = pt.concat(result);
               // console.log(`Received ${result.length} price types`);
                
            });


        //this.pt = new Array<PriceTypes>();
        //this.q2.map(t => getPriceDataUri(t.uri))
        //    .reduce((acc, curr) => [this.pt, curr], [])
        //    .subscribe((result: PriceTypes[]) => console.log(`Received ${result.length} price types`));
    }

    public setReady(regionName: string, typeName: string, stationName: string, regionid: string, typeid: number) {
        if (this.q2 == null)
            this.q2 = new Array<qarray>();

        let q1 = new qarray();
        q1.regionName = regionName;
        q1.stationName = stationName;
        q1.typeName = typeName;
        q1.uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/';
        this.q2.push(q1);

    }

}