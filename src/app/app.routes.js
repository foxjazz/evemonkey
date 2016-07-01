"use strict";
var router_1 = require('@angular/router');
var region_component_1 = require('./regions/region.component');
var ibg_comp_1 = require('./ItemsByGroup/ibg.comp');
var priceboard_component_1 = require('./PriceBoard/priceboard.component');
var help_component_1 = require('./Help/help.component');
var routes = [
    { path: 'help', component: help_component_1.HelpComponent },
    { path: 'regions', component: region_component_1.RegionComponent },
    { path: 'items', component: ibg_comp_1.ibgComponent },
    { path: 'priceboard', component: priceboard_component_1.PriceBoardComponent },
    { path: 'ibg', component: ibg_comp_1.ibgComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
];
//# sourceMappingURL=app.routes.js.map