import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import { OnDeactivate } from 'angular2/router';

@Component({
	selector: 'options-grid-item',
	properties: ['addon','selected'],

})

@View({
	templateUrl: 'app/components/membership/options/grid/options_grid_item.html',
	styleUrls: ['app/components/membership/options/grid/options_grid_item.css'],
	directives: [NgClass]
})

export class OptionsGridItem {
	selected: boolean;
	
	constructor(public dispatcher: Dispatcher){
		this.selected = true; 
	}

	open(value) {
		this.dispatcher.publish('optionsCarousel', 'set.modal', value.name);
		this.dispatcher.publish('optionsCarousel', 'toggle.modal', true)
	}
}	
