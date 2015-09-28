import { Inject, Injectable, bind, Component} from 'angular2/angular2';
import { Dispatcher, Store } from './services';
import { MembershipInit } from '../common/defaults';

export class MembershipState extends Store {
	dispatcher: Dispatcher;

	membershipOptions: any;

	constructor( @Inject(Dispatcher) dispatcher: Dispatcher) {
		super(dispatcher, 'MembershipState', MembershipInit);
		this.membershipOptions = this.select('membership', 'options').get();
	}

	get MembershipOptions() {
		return this.membershipOptions
	}
	
	convertMembership() {
		let members: any = this.select('members').get()
		let type: any = this.select('membership', 'type').get();
		let mSetup: any = this.select('membership', 'memberSetup').get();
		
		// Remove Members that don't fit in current template
		for (var key in members) {
			let t: any = _.find(mSetup, { type: key });	
			if(!t) {
				this.remove(['members',key])
			}
		}
	
		members = this.select('members').get()
		// Update Pricing based on current membership type
		for (var key in members) {
			let t: any = _.find(mSetup, { type: key });
			for (var sKey in members[key]) {
				this.update(['members',key,sKey,'price'],t.value[sKey].price);
			}
		}
	}
}
