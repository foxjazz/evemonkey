import {ItemGroup} from '../ItemsByGroup/interface';
export class DataGroups {
    constructor(subs: Array<ItemGroup>){
        this.subgrps = subs;
    }
    public subgrps: Array<ItemGroup>;
    public  getChilderen(it: ItemGroup): ItemGroup[]
    {
        let result = new Array<ItemGroup>();
        for(let sub of this.subgrps)
        {
            if(sub.parentGroup.href === it.href)
            {
                    result.push(sub);
            }
        }
        return result;
    }

}