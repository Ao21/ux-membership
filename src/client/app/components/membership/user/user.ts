import {
Component, 
NgFor,
View, 
Host, 
EventEmitter, 
OnDestroy, 
ViewQuery, 
QueryList, 
NgClass,
NgIf, 
OnInit} from 'angular2/angular2';
import {Router, Url} from 'angular2/router';
import {appDirectives, angularDirectives} from '../../../directives/directives';

import {MembershipState} from '../../../services/services';
import {sharedComponents} from '../../../components/shared/modules';

@Component({
	selector: 'membership-user',
})

@View({
	directives: [ appDirectives, NgFor, NgClass, sharedComponents, angularDirectives ],
	templateUrl: 'app/components/membership/user/user.html',
	styleUrls: ['app/components/membership/user/user.css']
})

export class User{
	state: any;
	values: any;
	
	constructor(public store: MembershipState, public router: Router){
		this.state = this.store.select('membership','memberSetup').get();
		console.log(this.state);
	}
	
	onUpdate() {
		this.store.debug__getSubs();
	}
	
	createMember(member, membershipType, mIn){
		this.store.update(['activeMember'], { index:mIn, type: membershipType.type, member:member})
	}

	
}