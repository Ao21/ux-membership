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
	selector: 'membership-price',
})

@View({
	directives: [ appDirectives, NgFor, NgClass, sharedComponents, angularDirectives ],
	templateUrl: 'app/components/membership/price/price.html',
	styleUrls: ['app/components/membership/price/price.css']
})

export class Price{
	state: any;
	values: any;
	
	constructor(public store: MembershipState, public router: Router){

	}
	
	
}