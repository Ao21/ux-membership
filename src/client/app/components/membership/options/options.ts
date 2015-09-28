import {Component, View, Host, EventEmitter, OnDestroy, ViewQuery, QueryList, OnInit} from 'angular2/angular2';
import {appDirectives, angularDirectives} from '../../../directives/directives';

import {OnDeactivate} from 'angular2/router';
import {OptionsGrid} from './grid/options_grid';
import {MembershipState} from '../../../services/services';
import {sharedComponents} from '../../../components/shared/modules';

import {MDCarouselSlider} from './../modals/carousel_slider/md_carousel_slider';


@Component({
	selector: 'membership-options'
})

@View({
	directives: [ angularDirectives, OptionsGrid, sharedComponents, MDCarouselSlider ],
	templateUrl : './app/components/membership/options/options.html',
	styleUrls: ['./app/components/membership/options/options.css']
})

export class Options implements OnInit, OnDeactivate{
	options: any;
	constructor(public store: MembershipState, @ViewQuery(OptionsGrid) options:QueryList<any>){
		this.options = options;
	}
	
	
	onDeactivate(){
		this.store.unsubsribeSub(this.options.first.sub)
	}
	
	
}