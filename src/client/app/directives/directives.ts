import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {LoadAtTop} from './loadAtTop';

// global App only directives
export var appDirectives: Array<any> = [
	LoadAtTop
];

// global Angular core and other Angular module directives (form/router)
export var angularDirectives: Array<any> = [
// angular's core directives
	CORE_DIRECTIVES,

// angular's form directives
	FORM_DIRECTIVES,

// angular's router
	ROUTER_DIRECTIVES
];
