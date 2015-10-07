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
NgIf,
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
	directives: [ NgFor, NgIf, sharedComponents, angularDirectives, CORE_DIRECTIVES ],
	templateUrl: 'app/components/membership/user/edit/edit.html',
	styleUrls: ['app/components/membership/user/edit/edit.css']
})

export class UserEdit{

	activeMember: any;
	fields: any;

	userForm: ControlGroup;
	ctrl: any = {};
	
	constructor(public store: MembershipState, 

	fb: FormBuilder,
	public router: Router
	){

		this.activeMember = this.store.select('activeMember').get()
		this.fields = this.activeMember.member.fields;
		
		// Create ctrl

		_.forEach(this.fields, (e: any) =>{
			this.ctrl[e.name] = isPresent(this.activeMember.member.values) ? this.activeMember.member.values[e.name] : [''];
		})
		
		_.mapKeys(this.activeMember.member.active,(k,v)=>{
			this.ctrl[v] = isPresent(this.activeMember.member.values) ? this.activeMember.member.values[v] : [''];
		})
		
	
		this.userForm = fb.group(this.ctrl)
		
		this.userForm.valueChanges.observer({
			next: (value) => {
				console.log(value);
			}
		})

	}
	
	checkform() {
		console.log(this);
		
	}
	
	finaliseMember() {
		this.store.update(['members',this.activeMember.type, this.activeMember.index], _.assign(this.userForm.value, { price:this.activeMember.member.price}));
		this.router.navigateByUrl('/membership/user')
	}
	
	onUpdate() {
		this.store.debug__getSubs();
	}
}