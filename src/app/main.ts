import { bootstrap }    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { HTTP_PROVIDERS, JSONP_PROVIDERS  } from '@angular/http';


//import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import 'rxjs/add/operator/map';
bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, JSONP_PROVIDERS]);

//bootstrap(RegionComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);