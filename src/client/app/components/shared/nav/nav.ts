import { Component, View, NgFor } from 'angular2/angular2';
import { RouterOutlet, RouteConfig, RouterLink } from 'angular2/router';

@Component({
	selector: 'nav',
	properties: ['title']
})

@View({
	directives: [RouterLink],
	templateUrl: 'app/components/shared/nav/nav.html',
	styleUrls: ['app/components/shared/nav/nav.css']
})

export class Nav {
	constructor() {
		
	}
}