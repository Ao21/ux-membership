import {CONST} from 'angular2/src/core/facade/lang';

export let DefaultStore: any = {

};

let monkey: any = Baobab.monkey;

let defaultMembershipConfig: any = {
	defaultPrices: {
		membership: new Number(8.25),
		extraInd: new Number(4.25),
		rescueme: new Number(5.75),
		family: new Number(13.99)
	}
};




export class KeyCodes {
	static ESCAPE = 27;
	static SPACE = 32;
	static UP = 38;
	static DOWN = 40;
}

export let MembershipInit: any = {
	
	addons: [{
		name: 'Membership Pack',
		details: ['AA Members Handbook',' AA Vintage Grill Badge',' AA Smart Badge',' AA Membership Cards'],
		price: 27.99,
		imageUrl: 'images/aa_membership_pack.png',
		active: false
	}],
	ui: {
		actionBar: {
			title: '',
			visible: false,
			priceEstimateVisible: false,
			states: [
				{ title: 'Title', image: '', bkColor: '', intervalColor: '' },
				{ title: 'Title2', image: '', bkColor: '', intervalColor: '' },
				{ title: 'Title3', image: '', bkColor: '', intervalColor: '' }
			]
		}
	},
	activeMember: {},
	members: {},
	membership: {
		options: {
			defaults: {
				active: true,
				price: new Number(0),
				benefits: [
					{ name: 'Roadside Rescue', icon: 'images/icons/roadsideRescue.svg', pkg: 'default', free: false, desc: '' },
					{ name: '24/7 Emergency Cover', icon: 'images/icons/emergenyCover.svg', pkg: 'default', free: false, desc: '' },
					{ name: 'Cover on your doorstep', icon: 'images/icons/doorstep.svg', pkg: 'default', free: false, desc: '' },
					{ name: 'Any vehicle cover', icon: 'images/icons/vehicleCover.svg', pkg: 'default', free: false, desc: '' },
					{ name: 'UK Cover', icon: 'images/icons/ukCover.svg', pkg: 'default', free: false, desc: '' },
					{ name: 'Home Start', icon: 'images/icons/homeStart.svg', pkg: 'default', free: true, desc: '' },
					{ name: 'AA Rewards', icon: 'images/icons/rewards.svg', pkg: 'default', free: false, desc: '' },
				]
			},
			rescuePlus: {
				active: false,
				price: new Number(5.75),
				benefits: [{ name: 'Onward Travel', icon: 'images/icons/onwardTravel.svg', pkg: 'rescuePlus', free: false, desc: '' },
					{ name: 'National Recovery', icon: 'images/icons/nationalRecover.svg', pkg: 'rescuePlus', free: false, desc: '' },
					{ name: 'Accom or Travel Expenses', icon: 'images/icons/accomodation.svg', pkg: 'rescuePlus', free: false, desc: '' }
				]
			},
			addons2: {
				active: false,
				price: new Number(500)
			}
		},
		membershipRules: {
			personal: [4, 0],
			family: [2, 7]
		},
		memberSetup: monkey(
			['membership', 'type', 'criteria'],
			['members'],
			function(type, mbs) {
			
				function createMember (amount, defaults, overrides?, mType?) {
					let members = [];
					
					// Create Members out of default types
					for (var i = 0; i < amount; i++) {
						members.push(_.merge({index:i},defaults))
					}
					
					// Override Default Values (Primary User)
					if(overrides){
						overrides.forEach(overide => {
							members[overide.index] = overide
						});
					}
					// If Members already generated grab their values and include in this code
					if(mbs[mType]){
						members = _.map(members,function(e,i){
							if(mbs[mType][i]){
								let values = {values:mbs[mType][i]}
								_.defaults(values,e);
								return values;
							} else { 
								return e
							}
						})
					}
					return members;
				}
				
				let mObj = [];
				
				_.mapKeys(type, function(key, value) {
					let obj: any = {value: createMember(key.max,key.defaults,key.overrides, value)}
					obj.header = key.header;
					obj.type = value;
					mObj.push(obj)
				})
				
				return mObj;
			}),
		// Debugging
		type: {},
			
		// Get All of this from Server
		types: [
			{
				name: 'Single Membership',
				basePrice: 8.25,
				// Adults - Young Adults - Children
				criteria: {
					adults: {
						header: 'Adults 17+',
						max: '2',
						overrides: [{ 
							index: 0, 
							type: 'primaryUser',
							price: 0,
							title: 'Please enter your details', 
							fields: 
								[
									{name:'firstName', display: 'First Name', visible: true, type: 'text'},
									{name:'lastName', display: 'Last Name', visible: true, type: 'text'},
									{name:'dob', display: 'Date of Birth', visible: true, type: 'date'}
									
								],
						}],
						defaults: { title: 'Add an additional Adult',
									type: 'additionalAdult', 
									price: 4.25,
									fields: [
									{name:'firstName', display: 'First Name', visible: true, type: 'text'},
									{name:'lastName', display: 'Last Name', visible: true, type: 'text'},
									{name:'dob', display: 'Date of Birth', visible: true, type: 'date'}

									
								] }
					},
					yAdults: {
						header: 'Adults 17-25',
						max: '2',
						defaults: { 
							title: 'Add an additional Adult',
							type: 'additionalYoungAdult',
							price: 4.25, 
							fields: [
									{name:'firstName', display: 'First Name', visible: true, type: 'text'},
									{name:'lastName', display: 'Last Name', visible: true, type: 'text'},
									{name:'dob', display: 'Date of Birth', visible: true, type: 'date'}

									
								] }

					}
				}
			},
			{
				name: 'Family Membership',
				basePrice: 13.99,
				criteria: {
					adults: {
						header: 'Adults 17+',
						max: '2',
						overrides: [{ 
							index: 0, 
							title: 'Please enter your details', 
							type: 'primaryUser',
							price: 0,
							fields: 
								[
									{name:'firstName', display: 'First Name', visible: true, type: 'text'},
									{name:'lastName', display: 'Last Name', visible: true, type: 'text'},
									{name:'dob', display: 'Date of Birth', visible: true, type: 'date'}

									
								],
						}],
						defaults: { 
							title: 'Add an additional Adult', 
							type: 'additionalAdult',
							price: 0,
							fields: [
									{name:'firstName', display: 'First Name', visible: true, type: 'text'},
									{name:'lastName', display: 'Last Name', visible: true, type: 'text'},
									{name:'dob', display: 'Date of Birth', visible: true, type: 'date'}

									
						] },
					},
					childs: {
						header: 'Children 0-17',
						max: '7',
						defaults: { 
							title: 'Add an additional child',
							price: 0,
							type: 'additionalChild', 
							fields: [
									{name:'name', display: 'Name', visible: true, type: 'text'},
									{name:'dob', display: 'Date of Birth', visible: true, type: 'date'},
									
						] }
					}
				}
			}
		],
		membersCount: {
			adults: 1,
			
			children: 0
		},
		paymentFrequency: 'monthly',
		paymentMethod: 'credit',
		priceEstimate: {
			initial: defaultMembershipConfig.defaultPrices.membership,
			calculated: monkey(
				['membership', 'priceEstimate', 'initial'],
				['membership', 'paymentFrequency'],
				['membership', 'options'],
				['members'],
				['membership', 'type'],
				['addons'],
				function(price: any, frequency: any, options: any, members: any, membershipType: any, addons: any): any {
					price = 0;
					
					price = membershipType.basePrice;
					
					_.forEach(members,(e: any)=>{
						price = price + _.reduce(_.pluck(e,'price'), function(total, num){
							return total + num;
						})
					})
					
					for (var option in options) {
						if (options[option].active === true) {
							price = price + options[option].price;
						}
					}
			
					
					if (frequency === 'monthly') {
						price = price
					} else {
						price = price * 12;
					}
					
					_.forEach(addons, (e:any) => {
						price = e.active ? price + e.price : price;
					})

					

					price = parseFloat(price.toPrecision(12));
					
					return price;

					
				})
		}
	}
};



export let MembershipConsts: any = {
	CHANNEL: 'Membership',
	UPDATE: 'update',
	ONUPDATE: 'is-updated',
	ONUPDATESTATE: 'is-updated.state'
};