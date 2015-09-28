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
	{ path: '/landing', component: Landing, as: 'landing' },
	{ path: '/options', component: Options, as: 'options' },
	{ path: '/payment', component: Payment, as: 'payment' },
	{ path: '/user', component: User, as: 'user' },
	{ path: '/user/edit', component: UserEdit, as: 'user-edit' },
	{ path: '/addons', component: Addons, as: 'addons'},
	{ path: '/price', component: Price, as: 'price'},
	{ path: '/payment/frequency', component: PaymentFrequency, as: 'payment-frequency' },
	{ path: '/payment/type', component: PaymentType, as: 'payment-type'}

])

@View({
	directives: [RouterOutlet, appDirectives, angularDirectives, sharedComponents, ActionBar],
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
