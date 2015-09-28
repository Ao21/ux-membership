import {Component, View, Attribute, EventEmitter} from 'angular2/angular2';
import {appDirectives, angularDirectives} from '../../../directives/directives';
import {KeyboardEvent} from 'angular2/src/core/facade/browser';
import {KeyCodes} from '../../../common/defaults';

@Component({
	selector: 'incrementor',
	properties: ['image', 'index', 'min', 'max', 'isDisabled:disabled', 'ariaValuenow'],
	host: {
		'role': 'spinbutton',
		'[attr.aria-valuenow]': 'index',
		'[attr.aria-valuemax]': 'max',
		'[attr.aria-valuemin]': 'min'
	},
	events: ['update']
})


@View({
	templateUrl: 'app/components/shared/incrementor/incrementor.html',
	styleUrls: ['app/components/shared/incrementor/incrementor.css']
})
export class Incrementor {
	update: EventEmitter = new EventEmitter();
	index: number;
	min: number;
	max: number;
	isDisabled: boolean;


	constructor(
		@Attribute('min') min: number,
		@Attribute('max') max: number
		) {
		this.min = min;
		this.max = max;

	}

	onKeydownMinus(event: KeyboardEvent): void {
		if (event.keyCode === KeyCodes.SPACE) {
			event.preventDefault();
			this.minus();
		}
	}
	onKeydownPlus(event: KeyboardEvent): void {
		if (event.keyCode === KeyCodes.SPACE) {
			event.preventDefault();
			this.plus();
		}
	}
	minus(): void {
		if (!this.isDisabled && this.index > this.min) {
			this.index--;
			debounce(this.update.next(this.index), 250, false);
		}
	}
	plus(): void {
		if (!this.isDisabled && this.index < this.max) {
			this.index++;
			debounce(this.update.next(this.index), 250, false);
		}
	}

}

function debounce(func: any, wait: any, immediate: any): any {
	'use strict';

	let timeout: any;
	return function(): void {
		let context: any = this, args: IArguments = arguments;
		let later: any = function(): void {
			timeout = null;
			if (!immediate) { func.apply(context, args); };
		};
		let callNow: any = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
};