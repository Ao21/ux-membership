import {Component, View, Inject, NgClass, NgIf, NgControl,EventEmitter, Attribute, OnInit, Renderer, ElementRef} from 'angular2/angular2';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, NgFormModel} from 'angular2/angular2';
import {appDirectives, angularDirectives} from '../../../directives/directives';
import {KeyCodes} from '../../../common/defaults';
import {NumberWrapper} from 'angular2/src/core/facade/lang';
import {isPresent} from 'angular2/src/core/facade/lang';


// 	TODO: Upgrade to have an NgControl Attached 
//	- see https://github.com/angular/angular/issues/2543

@Component({
	selector: 'checkbox',
	properties: ['init', 'boxVisible'],
	host: {
		'role': 'checkbox',
		'[tabindex]': 'tabindex',
		'[attr.checked]': 'isChecked',
		'(click)': 'check($event)',
		'[class.hiddenCheckbox]': 'isBoxVisible',
		'[class.checked]': 'isChecked',
		'[attr.aria-checked]': 'isChecked',
		'[attr.aria-disabled]': 'disabled',
		'(keydown)': 'check($event)'
	},
	events: ['update']

})

@View({
	templateUrl: 'app/components/shared/checkbox/checkbox.html',
	styleUrls: ['app/components/shared/checkbox/checkbox.css'],
	directives: [NgClass, NgIf, angularDirectives, FORM_DIRECTIVES]
})

export class Checkbox implements OnInit {
	update: EventEmitter;
	value: Value;
	init: boolean;
	tabindex: number;
	isDisabled: boolean;
	isChecked: boolean;
	isBoxVisible: boolean;
	onChange: Function;
    onTouched: Function;
	formControl: any;


	constructor( 
		public renderer: Renderer, 
		public elementRef: ElementRef,
		@Attribute('tabindex') tabindex: string, 
		@Attribute('nocheckbox') nocheckbox: boolean) 
		{
		this.update = new EventEmitter();
		this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
		this.isBoxVisible = isPresent(nocheckbox);
		this.onChange = (_) => {};
        this.onTouched = (_) => {};
		this.isDisabled = false;
		this.isChecked = false;
		
	}

	onInit(): void {
		this.isChecked = isPresent(this.init) ? this.init : false;
	};

	get disabled(): boolean {
		return this.isDisabled;
	}

	set disabled(value: boolean) {
		this.isDisabled = isPresent(value) && value !== false;
	}

	onKeydown(event: KeyboardEvent): void {
		if (event.keyCode === KeyCodes.SPACE) {
			event.preventDefault();
			this.check();
		}
	}
	
	

	check = () => {
		if (this.isDisabled) {
			event.stopPropagation();
			return;
		}
		this.isChecked = !this.isChecked;
		this.update.next(this.isChecked);
	};
}



export class Value {
  value: any;
  constructor(value) {
    this.value = value;
  }
}