import { Attribute, Component, View, Host, NgFor, ElementRef, AfterViewInit, OnDestroy, OnInit  } from 'angular2/angular2';
import { MembershipState, Dispatcher } from '../../../../services/services';
import { OnDeactivate, OnReuse } from 'angular2/router';
import { appDirectives, angularDirectives } from '../../../../directives/directives';

@Component({
	selector: 'md-carousel-slider',
	host: {
		'channel':'channel'
	}
})

@View({
	templateUrl: 'app/components/membership/modals/carousel_slider/md_carousel_slider.html',
	styleUrls: ['app/components/membership/modals/carousel_slider/md_carousel_slider.css'],
	directives: [angularDirectives]

})

export class MDCarouselSlider implements AfterViewInit, OnInit, OnDeactivate, OnDestroy {
	channel: string;
	state: any;
	options: any;
	el: JQuery;

	constructor(public store: MembershipState, el: ElementRef, public dispatcher: Dispatcher) {
		this.state = store.select('membership', 'options').get();
		this.el = $(el.nativeElement).find('.carousel');
		
		this.options = [];
		_.map(this.state, (e: any) => {
			_.map(e.benefits, (e) => {
				this.options.push(e);
			})
		})
	};

	onInit() {
		this.dispatcher.subscribe('optionsCarousel', 'set.modal', (data) => {
			this.el.slick('slickGoTo', this.options.map(function(e) { return e.name; }).indexOf(data), true)
		});
	}
	
	// TODO: Remove this once angular2 gets touch + animation events downs
	afterViewInit() {
		if (this.el.hasClass('slick-slider')) {
			this.el.slick('unslick');
		};
		this.el.slick({
			slide: '.modal-popup'
		});
	}

	closeModal() {
		this.dispatcher.publish('optionsCarousel', 'toggle.modal', false);
	}
	
	onDestroy(){
		this.dispatcher.unsubscribe('optionsCarousel','set.modal');
		this.el.slick('unslick');
		this.dispatcher = null;
	}

}
