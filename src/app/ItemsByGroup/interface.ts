export interface ItemGroup {name: string; href: string; id_str: string; id: number; types: {href: string; };
parentGroup: {href: string; };
description: string;
isExpanded: boolean;
children: Array<ItemGroup>;

}

export interface BItem {typeid: number; description: string; price: number;}
export interface ItemBuild {items: Array<BItem>; }
export interface ItemGroups {items: Array<ItemGroup>; }
export class ItemGroupsCls {items: Array<ItemGroup>; }
export interface bom {quantity: number; typeid: number; }
export interface Blueprint {
   productTypeId: number;
   bom: [{typeid: number; quantity: number; }];
}
export class ItemBuildCls { items: Array<BItem>; }

export class Hub { name: string; regionId: Number; stationId: Number; }
export class TradeHubs { Hubs: Array<Hub>; }
