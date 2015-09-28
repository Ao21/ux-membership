import { Directive, OnInit } from 'angular2/angular2';
import { OnActivate, OnDeactivate } from 'angular2/router';

import {DOM} from 'angular2/src/core/dom/dom_adapter';

@Directive({
	selector: '[load-at-top]'
})

export class LoadAtTop implements OnInit {
	onInit() {
		window.scrollTo(0, 0);
	}
}