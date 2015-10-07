import { Component, View, Host, ChangeDetectionStrategy, NgFor } from 'angular2/angular2';
import { OnActivate, OnDeactivate, Router } from 'angular2/router';
import { appDirectives, angularDirectives } from '../../../directives/directives';

import { MembershipState } from '../../../services/services';
import { sharedComponents } from '../../../components/shared/modules';

@Component({
	selector: 'membership-landing',
	changeDetection: ChangeDetectionStrategy.OnPush
})

@View({
	directives: [angularDirectives, sharedComponents, NgFor],
	templateUrl: 'app/components/membership/landing/landing.html',
	styleUrls: ['app/components/membership/landing/landing.css']
})


export class Landing {
	calculatedPrice: any;
	addons: any;
	membersCount: any;
	state: any;
	sub: any;
	
	disabledAdult: boolean = false;
	disabledChild: boolean = false;
	
	constructor(public store: MembershipState, public router: Router) {
		this.state = store.select('membership').get();
	}
	
	setMembershipType(type) {
		this.store.update(['membership','type'], type);
		this.store.convertMembership();
		this.router.navigateByUrl('/membership/options');
	}	

}

