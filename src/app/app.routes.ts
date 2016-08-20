import { provideRouter, RouterConfig } from '@angular/router';
import { RegionComponent } from './regions/region.component';
import { ibgComponent } from './ItemsByGroup/ibg.comp';
import { PriceBoardComponent } from './PriceBoard/priceboard.component';
import { HelpComponent } from './Help/help.component';
import { UserData } from './UserData/UserData.component';

const routes: RouterConfig = [ 
  {path: 'help', component: HelpComponent },
  {path: 'UserData', component: UserData},
  {path: 'regions', component: RegionComponent },
  {path: 'ItemsByGroup', component: ibgComponent },
  {path: 'PriceBoard', component: PriceBoardComponent },
  {path: '', redirectTo: 'ItemsByGroup', pathMatch : 'full'}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];