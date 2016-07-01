import {Component, Input} from '@angular/core';
import {ItemGroups,ItemGroup} from '../ItemsByGroup/interface';

@Component({
    selector: 'Donkey',
    template: `
       donkey donnkey {{data}}
    `,
    directives: [Donkey]
})

export class Donkey {
  @Input() data: string;
  
}