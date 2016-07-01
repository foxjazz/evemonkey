import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IRegions, Region, ISystems} from './IRegions';
import 'rxjs/add/operator/map';

@Injectable()
export class HTTPEveService {
    private uri = 'https://crest-tq.eveonline.com/regions/';
    private uriSys: string = '';
    public Regions: Array<Region>;

    public loading: boolean;
    public d: [Region];
    public e: Array<Object>;
    result: Object;
    constructor(private http: Http) { }

    getRegions(): Observable<IRegions> {
        return this.http.get(this.uri)
            .map((res: Response) => res.json());

    }
    getSystems(id: string): Observable<ISystems> {
        //https://crest-tq.eveonline.com/market/10000002/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/
        this.uriSys = 'https://crest-tq.eveonline.com/market/' + id + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/';
        return this.http.get(this.uriSys)
            .map((res: Response) => res.json());

    }
    //https://crest-tq.eveonline.com/market/10000002/orders/sell/?type=https://crest-tq.eveonline.com/types/34/
}