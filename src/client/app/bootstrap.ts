import { bootstrap, bind } from 'angular2/angular2';

import { locationInjectables } from './core/location';
import { helperInjectables } from './helpers/helpers';

import { ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF, ROUTER_BINDINGS as NG_ROUTER_BINDINGS, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from 'angular2/router';

import { appServices } from './services/services';
import { appDirectives, angularDirectives } from './directives/directives';

import { App } from './components/app';

const ROUTER_BINDINGS: Array<any> = [
	NG_ROUTER_BINDINGS,
	bind(ROUTER_PRIMARY_COMPONENT).toValue(App),
	bind(LocationStrategy).toClass(HashLocationStrategy),
	bind(APP_BASE_HREF).toValue('/')
];

let universalInjectables: [any] = [
	ROUTER_BINDINGS,
	helperInjectables,
	appServices
];





bootstrap(
	App,
	[universalInjectables]
	);

