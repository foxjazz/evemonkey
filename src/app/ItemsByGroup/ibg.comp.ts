import {Component,OnInit} from '@angular/core';
import {ItemGroups,ItemGroup,ItemGroupsCls} from './interface';
import {ibgService} from './ibg.service';
import {ItemTypes, ItemTypesA,ItemType} from '../EveItems/ItemTypes';
import {Istringdistance, stringdistance} from '../algs/stringdistance';
import {TreeView} from '../common/treeview.comp';
import {Donkey} from '../common/donkey.comp';


@Component ({
  selector: 'as-sel-groups',
  templateUrl: 'app/ItemsByGroup/ibg.html',
  styleUrls: ['app/itemsByGroup/ibg.css'],
  directives: [TreeView,Donkey],
  providers: [ibgService]
})
export class ibgComponent implements OnInit{
    
    
    public subgrps: Array<ItemGroup>;
    public dondata = 'the data';
    private  itemGroups: Array<ItemGroup>;
    public itemTopGroups: Array<ItemGroup>;
    public selItem: ItemType;
    public selItemTypes: Array<ItemType>;
    private predGrps: Array<ItemGroup>;
    
    public itemsFromGroup: ItemTypesA;
    public itmtypes: Array<Object>;
    public selGrps: Array<Object>;
    private ItemService: ibgService;
    private cnt: number;
    constructor(private itgs: ibgService){ 
        
         this.ItemService = itgs;
         this.selItemTypes = new Array<ItemType>();
         
    }
     
     dosd(event : any){
        let s = event.target.value;
        if(s.length < 3)
            return;
        let objh: Istringdistance;            
        objh = {prop: 'type.name', list: this.itmtypes, input: s  };
        let sd = new stringdistance(objh);    
        this.itmtypes = sd.result;
    }
    toggle(it: ItemGroup)
    {
        if(it.isExpanded)
            it.isExpanded = false;
        else
            it.isExpanded = true;
    }
    getChildren(it: ItemGroup) : ItemGroup[]
    {
        this.selGrps = it.children;
        return it.children;
    }
    private getGroups()
    {
        this.itemGroups = this.itgs.getGroupData();
        this.itemTopGroups = new Array<ItemGroup>();
        this.subgrps = new Array<ItemGroup>();
        for(let grp of this.itemGroups)
        {
            if(grp.parentGroup === undefined)
                this.itemTopGroups.push(grp);
            else
                this.subgrps.push(grp);
        }
        for(let grp of this.itemTopGroups)
        {
            this.doChildren(grp);
        }
    }

    private doChildren(parent: ItemGroup)
    {
        
        for(let ch of this.subgrps)
        {
             if(parent.href === ch.parentGroup.href)
                {
                    if(parent.children === undefined)
                    {
                        parent.children = new Array<ItemGroup>();
                    }
                    parent.children.push(ch);
                    this.doChildren(ch);
                }
        }
    }

   /* private populateChildren(pg: Array<ItemGroup>){
        for(let ch of this.subgrps)
        {
            for(let parentGrp of pg)
            { 
                    if(parentGrp.href === ch.parentGroup.href)
                    {
                        parentGrp.children.push(ch);
                    }
            }
        }
    }*/

    private getTypes() {
        let res: string;
         res = localStorage.getItem('SelEveItems');
         if(res != null && res.indexOf('marketGroup') > 0)
         {
             let restry = JSON.parse(res);
             this.selItemTypes = restry;
         }
         else {  
            this.selItemTypes = new Array<ItemType>(); 
            } 
    }
     public onRemoveItem = function( item: ItemType){
        this.tempItem = this.selItemTypes;
        this.selItemTypes = new Array<ItemType>();
        let i = 0;
        for (i = 0; i < this.tempItem.length; i++) {
          if (item === this.tempItem[i]) {
            continue;
          }
          this.selItemTypes.push(this.tempItem[i]);
        }
         localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
    }
   public onSelectItem = function (it: ItemType) {
        
        let i = 0;
        for (i = 0; i < this.selItemTypes.length; i++) {
            if (it === this.selItemTypes[i]) {
                return;
            }
        }
        this.selItemTypes.push(it);
        localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
    }
    public onItemsSelect(href: string)
    {
        this.ItemService.getUnderData(href).subscribe(res3 => {
            this.itmtypes =[];
            this.itmtypes = res3.items; } );
    }
    onSelectItemTopGroup(item: ItemGroup){
        //this.subgrps = item.children;
        this.itgs.getUnderData(item.types.href).subscribe(res3 => {
            this.itmtypes = [];
            this.itmtypes = res3.items; });
        item.isExpanded = true;
    }

    onSelectItemGroup(item: ItemGroup) {
        this.itgs.getUnderData(item.types.href).subscribe(res3 => {
            this.itmtypes = [];
            this.itmtypes = res3.items; }); 
    }
            
    ngOnInit() {
        this.ItemService.setGroupData();    
        this.getTypes();
        this.getGroups();
        this.itgs.getUnderData('https://crest-tq.eveonline.com/market/types/?group=https://crest-tq.eveonline.com/market/groups/4/')
        .subscribe(res3 => {
            this.itmtypes = res3.items;
        });
        

    }
}