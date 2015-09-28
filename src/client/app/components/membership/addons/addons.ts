import {
Component, 
View, 
NgFor,
NgIf,
} from 'angular2/angular2';

import {OnDeactivate} from 'angular2/router';

import {appDirectives, angularDirectives} from '../../../directives/directives';

import {MembershipState} from '../../../services/services';
import {sharedComponents} from '../../../components/shared/modules';

@Component({
	selector: 'membership-addons',
})

@View({
	directives: [ angularDirectives, sharedComponents, NgFor, NgIf ],
	templateUrl: 'app/components/membership/addons/addons.html',
	styleUrls: ['app/components/membership/addons/addons.css']
})
export class Addons implements OnDeactivate{
	addons :any;
	sub: ISubscriptionDefinition;
	
	constructor(public store: MembershipState){
		this.addons = store.select('addons').get();
		this.sub = this.store.subscribe((state: any) => {
			this.addons = state.select('addons').get();
		});
		
	}
	
	toggleAddon(toggle,addon) {
		this.store.update(['addons',addon,'active'], toggle)
	};
	
	onDeactivate() {
		this.store.unsubsribeSub(this.sub);
	}
}