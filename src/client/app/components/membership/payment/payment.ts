import {
Component, 
View, 
Host, 
EventEmitter, 
OnDestroy, 
ViewQuery, 
QueryList,
NgIf, 
OnInit} from 'angular2/angular2';

import {appDirectives, angularDirectives} from '../../../directives/directives';

import {MembershipState} from '../../../services/services';
import {sharedComponents} from '../../../components/shared/modules';



@Component({
	selector: 'membership-payment',
})

@View({
	directives: [ NgIf, sharedComponents ],
	templateUrl: 'app/components/membership/payment/payment.html',
	styleUrls: ['app/components/membership/payment/payment.css']
})

export class Payment{
	paymentMethod: any;
	
	constructor(public store: MembershipState){
		this.paymentMethod = this.store.select('membership','paymentMethod').get();
		console.log(this.paymentMethod)
	}
	
	onUpdate() {
		console.log('ugh');
	}

	
}