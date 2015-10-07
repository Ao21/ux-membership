import { bind } from 'angular2/angular2';
import { ROUTER_BINDINGS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';

export const locationInjectables: Array<any> = [
	ROUTER_BINDINGS,
	bind(LocationStrategy).toClass(HashLocationStrategy),
	bind(APP_BASE_HREF).toValue('/')
];


