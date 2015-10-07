import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {FORM_BINDINGS, FORM_DIRECTIVES} from 'angular2/angular2'
import {Dispatcher} from '../services/services';
import {Logger} from '../helpers/logger';
import {appPipes} from '../pipes/pipes';

import {sharedComponents} from './shared/modules';
import {MembershipConfiguration} from './membership/configuration';
import {DOM} from 'angular2/src/core/dom/dom_adapter';

import { MembershipState } from '../services/services';

@Component({
	selector: 'app', // without [ ] means we are selecting the tag directly
	bindings: [Dispatcher, Logger, FORM_BINDINGS]
})

@View({
	directives: [ROUTER_DIRECTIVES, sharedComponents],
	templateUrl : './app/layout/shell.html'
})

@RouteConfig([
	{ path: '/', redirectTo: '/membership/landing'},
	{ path: '/membership/...', component: MembershipConfiguration, as: 'Membership'}
	
])

export class App {
	state: any;
	constructor(public store: MembershipState, router: Router) {
		this.state = store.select('ui').get();
		
		router.subscribe((e) => {
			this.store.update(['ui','actionBar','visible'], e != 'membership/landing' ? true : false);
			if (e=='membership/landing') {
				DOM.removeClass(DOM.query('body'),'progress--isVisible');
			}
			else {
				DOM.addClass(DOM.query('body'),'progress--isVisible');
			}
			
		});
	}
}

