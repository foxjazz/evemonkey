export interface ItemGroup {name: string; href: string; id_str: string; id: number; types:{href: string;};
parentGroup: {href: string; };
description: string;
isExpanded: boolean;
children: Array<ItemGroup>;

}

export interface ItemGroups {items: Array<ItemGroup>; }
export class ItemGroupsCls {items: Array<ItemGroup>; }