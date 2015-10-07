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
	selector: 'membership-payment-type',
})

@View({
	directives: [ sharedComponents ],
	templateUrl: 'app/components/membership/payment/payment_type/payment_type.html'
})

export class PaymentType{
	constructor(public store: MembershipState, public router: Router){
		
	}
	
	select(paymentType: string) {
		this.store.update(['membership','paymentMethod'], paymentType);
		if(paymentType == 'credit') {
			this.router.navigateByUrl('/membership/payment');
		}
		else {
			
		}
		
	}

	
}