import { Component, OnInit} from '@angular/core';
import {Region, ISystem, ISystemShortDescriptor, ISystemShort} from './IRegions';
import { HTTPEveService } from './http-eve.service';
import 'rxjs/Rx';

// package.json has the dependency list
@Component({
    templateUrl: 'app/regions/region.component.html',
    styleUrls: ['app/regions/region.css'],
    providers: [HTTPEveService]
})

//[provide('localStorage', {useValue: window.localStorage})]

export class RegionComponent implements OnInit {
    public title: string = 'Regions List';
    private errorMessage: string = '';
    public Regs: Array<Region>;
    
    private loaded = false;
    public avSystems: Array<ISystem>;
    private selRegion: Region;
    private tempSys: Array<ISystemShort>;
    public selSystems: Array<ISystemShort>;
    public lastSelRegion: string;
    private lastSelRegionId: string;
    
      constructor(private eveService: HTTPEveService) { }
      
      private notfound(sys: Array<ISystem>,s: string) : boolean {
        for (let t of sys) {
          if(t.location.name.indexOf(s) >= 0)
            return false;
        }
        return true;
      }
      private dedupe(sys: Array<ISystem>): Array<ISystem>
      {
        let res: Array<ISystem>;
        res = new Array<ISystem>();
        for(let t of sys)
        {
          if(this.notfound(res,t.location.name))
            res.push(t);
        }
        return res.sort((left, right): number => {if(left.location.name < right.location.name) return -1; if(left.location.name > right.location.name) return 1; else return 0;});
      };
      
      public onRemoveStation(systemshort: ISystemShort)
      {
        this.tempSys = this.selSystems;
        this.selSystems = new Array<ISystemShort>();
        let i = 0;
        for (i = 0; i < this.tempSys.length; i++) {
          if (systemshort === this.tempSys[i]) {
            continue;
          }
          this.selSystems.push(this.tempSys[i]);
        }
        localStorage.setItem('Systems', JSON.stringify(this.selSystems));
      }
    public onSelectStation(system: ISystem){
      if(this.selSystems == null){
        this.selSystems = new Array<ISystemShort>();
      }
      var systemshort: ISystemShort = <ISystemShort>{};
      systemshort.regionName = this.lastSelRegion;
      systemshort.regionid = this.lastSelRegionId;
      systemshort.stationName = system.location.name;
      systemshort.systemid = system.location.id_str;
      let i = 0;
        for (i = 0; i < this.selSystems.length; i++) {
          if (systemshort === this.selSystems[i]) {
            return;
          }
        }
        this.selSystems.push(systemshort);
        //JSON.stringify(this.selSystems);

        localStorage.setItem('Systems', JSON.stringify(this.selSystems));
          /*let res: string;
         res = localStorage.getItem('Systems');
         var restry = JSON.parse(res);
         console.log('res string from localstorage');
         console.log(res);
         console.log('object restry from localstorage');
         console.log (restry);
         this.selSystems = restry;*/
    }
    
      public onSelectRegion(region: Region) {
        this.selRegion = region;
        this.lastSelRegion = region.name;
        this.lastSelRegionId = region.id_str;
        this.eveService.getSystems(this.selRegion.id_str).subscribe(res => {
          this.avSystems = this.dedupe(res.items);
          //this.avSystems = this.avSystems.sort((left, right): number => {if(left.location.name < right.location.name) return -1; if(left.location.name > right.location.name) return 1; else return 0;})
        });
      }

     getRegions(){
         let restry = JSON.parse(localStorage.getItem('Systems'));
         /*console.log('res string from localstorage');
         console.log(res);
         console.log('object restry from localstorage');
         console.log (restry);*/
         let jsondata = localStorage.getItem('Systems');
         if (jsondata != null && jsondata.indexOf('stationName') > 0)     {
           this.selSystems =JSON.parse(jsondata);
         }
// first I  need to know if data is compantible with res
        // data = JSON.parse(res);

         this.eveService.getRegions().subscribe(res2 => 
                {
                this.Regs =  res2.items.filter(function(el: Region): boolean{
                  if ( isNaN(+el.name.slice(-1))) {
                   return true;
                  }
                });
                if (this.Regs.length > 0) {
                  this.loaded = true;
                }
           }, err => console.log('Something went wrong: ' + err.message));
     }

     ngOnInit() 
      {
        this.getRegions();
      }
}

