
import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {items, PriceData, PriceSellBand, PriceSellBands, PriceTypes} from '../priceboard/pricetypes';
import {ISystemShort} from '../regions/IRegions';
import {ItemType} from '../eveitems/ItemTypes';
import 'rxjs/add/operator/map';

@Injectable()
export class PriceService {
    private uri: string;
    private listSystems: Array<ISystemShort>;
    private listItems: Array<ItemType>;
    private priceSellBands: PriceSellBands;
    constructor(private http: Http ) { }
    public getSellBand(): Observable<any> {
        this.DoAllSelections();
        return Observable.from(this.priceSellBands.bands);
    }
    
    
      getPriceData(regionid: string, typehref: string): Observable<PriceTypes> {
        this.uri = 'https://crest-tq.eveonline.com/market/' + regionid + '/orders/sell/?type=' + typehref;
        console.log('URI for price data' + this.uri);
        return  this.http.get(this.uri)
            .map((res: Response) => res.json());

    }
    
   
    
    private DoAllSelections() {
        this.popItems();
        this.popSystems();
        let isys = 0;
        let iitem = 0;
        try {
        let x = this.listSystems.length + this.listItems.length;
        if(x === 0){
            document.getElementById('noData').hidden = false;
            return;  
        } 
        } catch (error) {
        document.getElementById('noData').hidden = false;
        return;
        }
        for (isys = 0; isys < this.listSystems.length; isys++) {
            for (iitem = 0; iitem < this.listItems.length; iitem++) {
                this.callPriceData(this.listSystems[isys].regionName,this.listItems[iitem].type.name,this.listSystems[isys].systemName,this.listSystems[isys].regionid, this.listItems[iitem].id.toString());
            }
        }
  }
  
    private callPriceData(region: string, itemname: string, station: string,regionid: string, itemhref: string) {
    this.getPriceData(regionid, itemhref).subscribe(res => {
      if(res.items.length > 0)
        this.aggItems(region, itemname, station, res.items);
    },
      err => console.log('Something went wrong:' + err.message));
  }
    private popItems():void{
         let res: string;
         res = localStorage.getItem('SelEveItems');
         if(res != null && res.indexOf('marketGroup') > 0)
         {
             let restry = JSON.parse(res);
             this.listItems = restry;
         }
    }
    private popSystems(): void
    {
         let jsondata = localStorage.getItem('Systems');
         if (jsondata != null && jsondata.indexOf('systemid') > 0)     {
           this.listSystems =JSON.parse(jsondata);
         }
    }
    
    private aggItems(region: string, itemname: string, station: string,data: Array<items>){
    let filtered: Array<items>;
    let i = 0;
    let pp = new Array<PriceData>();
    let bb = new Array<PriceData>();
    let bbs = new Array<PriceData>();
    let pps = new Array<PriceData>();
    for(i = 0; i < data.length; i++)
    {
        let p: PriceData = new PriceData();
        p.duration = data[i].duration;
        p.price = data[i].price;
        p.volume = data[i].volume;
        p.range = data[i].range;
        p.issued = data[i].issued;
        p.location = data[i].location.name;
        pp.push(p);
    }
    pps = pp.sort((left, right): number => {if(left.price < right.price) return -1; if(left.price > right.price) return 1; else return 0;});
    // NEW INTERFACE OBJECT
    if(pps.length > 0){
        let npb: PriceSellBand = {
        region: region,
        itemname: itemname,
        station: station,
        priceData: pps[0]
        };
        this.priceSellBands.bands.push(npb);
    }
    
  }

    
}