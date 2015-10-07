import {
Component, 
View, 
Host, 
EventEmitter, 
OnDestroy, 
ViewQuery, 
QueryList, 
OnInit} from 'angular2/angular2';

import {appDirectives, angularDirectives} from '../../../../directives/directives';
import {Router} from 'angular2/router';

import {MembershipState} from '../../../../services/services';
import {sharedComponents} from '../../../../components/shared/modules';



@Component({
	selector: 'membership-payment-frequency',
})

@View({
	directives: [ sharedComponents ],
	templateUrl: 'app/components/membership/payment/payment_frequency/payment_frequency.html'
})

export class PaymentFrequency{
	constructor(public store: MembershipState, public router: Router){
		
	}
	
	select(paymentFrequency: string) {
		this.store.update(['membership','paymentFrequency'], paymentFrequency);
		this.router.navigateByUrl('/membership/payment/type');
		
	}

	
}