import {Attribute, Component, View, Host, OnDestroy} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';

@Component({
	selector: 'estimate-modal',
	properties: ['channel'],
	bindings: [
	]
})

@View({
	templateUrl: 'app/components/membership/modals/price_estimate/md_price_estimate.html',
	styleUrls: ['app/components/membership/modals/price_estimate/md_price_estimate.css'],

})

export class MDPriceEstimate{


	
}
