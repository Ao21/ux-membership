import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass, OnDestroy, OnInit} from 'angular2/angular2';
import {Dispatcher} from './../../../services/services';
import { OnDeactivate } from 'angular2/router';
import {DOM} from 'angular2/src/core/dom/dom_adapter';


export class Modal implements OnInit, OnDestroy{
	channel: string;
	dispatcher: Dispatcher;
	isVisible: boolean;
	
	constructor(
		dispatcher: Dispatcher){
			this.dispatcher = dispatcher;
			this.isVisible = false;
	}
	
	onInit() {
		this.dispatcher.subscribe(this.channel,'toggle.modal', this.toggleModal);
	}
	
	toggleModal = (toggle) => {
		this.isVisible = toggle ? toggle : !this.isVisible;
		if (toggle){
			DOM.addClass(DOM.query('body'),'scrollfix')
		} else {
			DOM.removeClass(DOM.query('body'),'scrollfix')
		}
			
		
	}
	
	
	onDestroy() {
		this.dispatcher.unsubscribe(this.channel,'toggle.modal');
		this.dispatcher = null;
	}
	
	
}