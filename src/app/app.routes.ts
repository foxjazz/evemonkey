import { provideRouter, RouterConfig } from '@angular/router';
import {RegionComponent} from './regions/region.component';
import {ibgComponent} from './ItemsByGroup/ibg.comp';
import {PriceBoardComponent} from './PriceBoard/priceboard.component';
import {HelpComponent} from './Help/help.component';

const routes: RouterConfig = [ 
  {path: 'help', component: HelpComponent },
  {path: 'regions', component: RegionComponent },
  {path: 'ItemsByGroup', component: ibgComponent },
  {path: 'PriceBoard', component: PriceBoardComponent },
  {path: '', redirectTo: 'ItemsByGroup', pathMatch : 'full'}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];