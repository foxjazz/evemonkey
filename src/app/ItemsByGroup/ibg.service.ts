//https://crest-tq.eveonline.com/market/groups

import {Injectable} from '@angular/core';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ItemGroups,ItemGroup,ItemGroupsCls} from './interface';
import {ItemTypesA} from '../EveItems/ItemTypes';
import 'rxjs/add/operator/map';
//import {ItemTypes} from './ItemTypes';
//  var systemshort: ISystemShort = <ISystemShort>{};


@Injectable()
export class ibgService {
    private uri: string;
    private itemGroups: ItemGroups;
    private Parents: ItemGroupsCls;
    private itmGrps: ItemGroup[];
   constructor(private http: Http){}

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