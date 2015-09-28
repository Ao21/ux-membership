
import { Component, View, EventEmitter } from 'angular2/angular2';
import { angularDirectives } from '../../../directives/directives';
import { MembershipState } from '../../../services/services';
import { Dispatcher } from '../../../services/services';
import { Router, Location, OnActivate, OnDeactivate } from 'angular2/router';

@Component({
	selector: 'action-bar',
	events: ['toggleOpenPriceEstimate : toggleopenpriceestimate'],
	properties: ['priceEstimateIsVisible']
})

@View({
	templateUrl: 'app/components/membership/actionbar/actionbar.html',
	styleUrls: ['app/components/membership/actionbar/actionbar.css'],
	directives: [angularDirectives]
})

export class ActionBar {
	toggleOpenPriceEstimate: EventEmitter = new EventEmitter;
	state: any;

	constructor(
		public store: MembershipState,
		public dispatcher: Dispatcher,
		public router: Router,
		public location: Location) {
			this.toggleOpenPriceEstimate ;
			this.state = this.store.get();
			this.store.subscribe((state: any) => {
				this.state = state.get();
			});
	}
	navigateBack() {
		this.location.back();
	}
	
	
	togglePriceEstimate() {
		//Local Event Emitter
		this.dispatcher.publish('Membership.Estimate','toggle.modal',null);
	}
	
}

