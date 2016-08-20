//https://crest-tq.eveonline.com/market/groups

import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ItemGroups,ItemGroup,ItemGroupsCls,bom, ItemBuild, BItem} from './interface';
import {ItemTypesA} from '../EveItems/ItemTypes';

import {PriceTypes, items, PriceData} from '../PriceBoard/PriceTypes';

import 'rxjs/add/operator/map';
//import {ItemTypes} from './ItemTypes';
//  var systemshort: ISystemShort = <ISystemShort>{};


@Injectable()
export class ibgService {
    private uri: string;
    private itemGroups: ItemGroups;
    private Parents: ItemGroupsCls;
    private itmGrps: ItemGroup[];
    private buildData: ItemBuild;
    private tbom: bom[];
   constructor(private http: Http){}
   //http://evecore.azurewebsites.net/api/blueprint/11183

   getBuildPrice(thisbom: bom[], Region: Number): Observable<PriceTypes[]> {

       let pt = new Array<PriceTypes>();
           return Observable.from(thisbom)
           .flatMap(t => this.getPriceDataUri(t.typeid, Region))
           .toArray()
           .do((result: PriceTypes[]) => {
                pt = pt.concat(result);
            });
   }
   public getBOM(typeid: string): Observable<bom[]> {
        //let uri = 'http://evecore.azurewebsites.net/api/blueprint/' + typeid;
       let uri = 'https://54.227.207.106:3001/api/evemarket/' + typeid;
        return this.http.get(uri)
        .map((res: Response) => res.json());

   }
  

   
/*
               for(let bomitem of thisbom)
               {
                    for(let pt of result)
                    {
                       if(pt.typeid == bomitem.typeid)
                       {
                           let prc: number;
                           prc = this.getPriceTotal(bomitem.quantity,pt.items);
                           let ibitem: BItem = {typeid: bomitem.typeid, description: pt.typeName, price: prc};
                           data.items.push(ibitem);
                       }
                    }
               }
*/ 
   public getPriceTotal(q: number, itms: Array<items>, stationid: Number) : number
   {
       let retval = 0;
       let cumval = 0;
       let rownum = 0;
       let qvol = q;
       let ps = new Array<PriceData>();
        for(let oo of itms)
        {
            if(oo.buy === false && oo.location.id === stationid)
            {
                let pd = new PriceData();
                pd.price = oo.price;
                pd.volume = oo.volume;
                ps.push(pd);
            }
        }
        let pps = ps.sort((left, right): number => {if(left.price < right.price) return -1; if(left.price > right.price) return 1; else return 0;});

        if (pps.length > rownum) {
            while (qvol > 0 && pps.length >= rownum) {
                if (qvol <= pps[rownum].volume) {
                    cumval += qvol * pps[rownum].price;
                    qvol = 0;
                }
                else {
                    cumval += parseFloat((pps[rownum].volume * pps[rownum].price).toFixed(2));
                }
                rownum++;
            }
        }
        if (qvol > 0)
            retval = -1;
        else
            retval = cumval;
        return parseFloat(retval.toFixed(2));
        
   }
   public setGroupData() {

       //let dlast = localStorage.getItem('lastsaved');
       //if ( dlast===null || (Number(dlast) + 1) < Number(this.ymd()))
         //{
            this.uri = 'https://crest-tq.eveonline.com/market/groups/';
            this.http.get(this.uri)
            .map((res: Response) => res.json()).subscribe(res => {
                this.itmGrps =[];
                this.itmGrps = res.items;
                localStorage.setItem('SelEveGroups',JSON.stringify(this.itmGrps));
                
            })
         //}   
        //let rrr = localStorage.getItem('SelEveItems');
        //return Observable.of(localStorage.getItem('whatever')).map(raw => JSON.parse(rrr));
        //return Observable.of(localStorage.getItem('SelEveItems')).map(raw => JSON.parse(raw));
        
   }
   public getGroupData(): Array<ItemGroup> {

      let res = localStorage.getItem('SelEveGroups');
      if(res != null )
         {
             return JSON.parse(res);
             //this.selItemTypes = restry;
         }
         else {  
            return new Array<ItemGroup>(); 
            } 
   }

   public getGroupHref(): Observable<ItemGroups> {
       this.uri = 'https://crest-tq.eveonline.com/market/groups/';
       return this.http.get(this.uri)
           .map((res: Response) => res.json());
   }


    public getPriceDataUri(typeid: number, Region: Number): Observable<PriceTypes> {
       //let uri = 'https://crest-tq.eveonline.com/market/10000002/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/'
        let uri = 'https://crest-tq.eveonline.com/market/' + Region.toString() + '/orders/?type=https://crest-tq.eveonline.com/inventory/types/' + typeid.toString() + '/'
        return this.http.get(uri).map((res: Response) => {
            let p1: PriceTypes;
            p1 = res.json();
            p1.typeid = typeid;
            return p1;
        });
   }

    // https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2F3rdpartysite.com%2Fcallback&client_id=3rdpartyClientId&scope=characterContactsRead%20characterContactsWrite&state=uniquestate123
    public getAccessToken(): Observable<any> {
        let uri = 'https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2Fevemarket.foxjazz.net%2Fcallback&client_id=9e60440952b2450eafc5e28943fbedef&scope=characterContactsRead%20characterContactsWrite&state=uniquestate123';
        return this.http.get(uri).map((res: Response) => {
           
            let ppp = res.json();
            return ppp;
        });
    }

   private ymd():string{
            let dateObj = new Date();
            let month = (dateObj.getUTCMonth() + 1).toString(); //months from 1-12
            if(month.length === 1)
                month = '0' + month;
            let day = dateObj.getUTCDate().toString();
            if(day.length === 1)
                day = '0' + day;
            let year = dateObj.getUTCFullYear();
                return year.toString() + month + day;
   }


    public getUnderData(urip: string): Observable<ItemTypesA> {
    //    this.uri = 'https://crest-tq.eveonline.com/market/groups/';
        return this.http.get(urip)
            .map((res: Response) => res.json());
   }

}