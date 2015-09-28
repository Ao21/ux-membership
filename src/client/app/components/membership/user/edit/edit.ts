import {
Component, 
View, 
Host, 
EventEmitter, 
OnDestroy, 
ViewQuery, 
QueryList,
ElementRef,
ControlGroup,
DynamicComponentLoader,
NgFor, 
FormBuilder,
NgControl,
Control,
CORE_DIRECTIVES,
OnInit} from 'angular2/angular2';

import {
isPresent
} from 'angular2/src/core/facade/lang';

import {Router,RouteParams} from 'angular2/router';

import {appDirectives, angularDirectives} from '../../../../directives/directives';

import {MembershipState} from '../../../../services/services';
import {sharedComponents, DynamicLoader} from '../../../../components/shared/modules';


@Component({
	selector: 'membership-user-edit',
	bindings: [DynamicLoader, FormBuilder]
})

@View({
	directives: [ NgFor, sharedComponents, angularDirectives, CORE_DIRECTIVES ],
	templateUrl: 'app/components/membership/user/edit/edit.html',
	styleUrls: ['app/components/membership/user/edit/edit.css']
})

export class UserEdit{
	params: any;
	activeMember: any;
	data: any;
	fields: any;
	name: Control;
	userForm: ControlGroup;
	
	constructor(public store: MembershipState, 
	params: RouteParams, 
	fb: FormBuilder,
	public router: Router
	){
		this.params = params.params;
		this.activeMember = this.store.select('activeMember').get()
		this.fields = this.activeMember.member.fields;

		// Create Controls
		let controls = {};
		_.forEach(this.fields, (e: any) =>{
			controls[e.name] = isPresent(this.activeMember.member.values) ? this.activeMember.member.values[e.name] : [''];
		})
		
		this.userForm = fb.group(controls)
		
		this.userForm.valueChanges.observer({
			next: (value) => {
				
			}
		})

	}
	
	checkform() {
		console.log(this);
		
	}
	
	finaliseMember() {
		this.store.update(['members',this.activeMember.type, this.activeMember.index], _.assign(this.userForm.value, { price:this.activeMember.member.price}));
		this.router.navigate('/membership/user')
	}
	
	onUpdate() {
		this.store.debug__getSubs();
	}
}