import { Component, View, EventEmitter, Inject} from 'angular2/angular2';
import { RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, Router} from 'angular2/router';
import { appDirectives, angularDirectives} from './../../directives/directives';


import { Landing, 
Options, 
Payment, 
User, 
UserEdit, 
Addons, 
Price,
PaymentFrequency,
PaymentType } from './modules';
import { ActionBar } from './modules';
import { MembershipState } from '../../services/services';
import { sharedComponents } from './../../components/shared/modules';


@Component({
	selector: 'membership',
	bindings: [MembershipState]
})


@RouteConfig([
	{ path: '/', redirectTo: '/landing' },
	{ path: '/landing', component: Landing, as: 'Landing' },
	{ path: '/options', component: Options, as: 'Options' },
	{ path: '/payment', component: Payment, as: 'Payment' },
	{ path: '/user', component: User, as: 'User' },
	{ path: '/user/edit', component: UserEdit, as: 'UserEdit' },
	{ path: '/addons', component: Addons, as: 'Addons'},
	{ path: '/price', component: Price, as: 'Price'},
	{ path: '/payment/frequency', component: PaymentFrequency, as: 'PaymentFrequency' },
	{ path: '/payment/type', component: PaymentType, as: 'PaymentType'}

])

@View({
	directives: [ROUTER_DIRECTIVES, appDirectives, angularDirectives, sharedComponents, ActionBar],
	templateUrl: 'app/components/membership/index.html'
})

export class MembershipConfiguration {
	state: any;

	constructor(public store: MembershipState, router: Router) {
		this.state = store.select('ui').get();

		this.setDebugProps()


	}

	setDebugProps() {
		let types: any = this.store.select('membership','types').get();
		this.store.update(['membership','type'], types[0]);
		let activeMember: any = this.store.select('membership','memberSetup').get();
		this.store.update(['activeMember'],{index: 0, type:'adults', member: activeMember[0].value[0]});

	}
}
