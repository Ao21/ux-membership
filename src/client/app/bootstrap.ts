import { bootstrap } from 'angular2/angular2';

import { locationInjectables } from './core/location';
import { helperInjectables } from './helpers/helpers';


import { appServices } from './services/services';
import { appDirectives, angularDirectives } from './directives/directives';

let universalInjectables: [any] = [
	locationInjectables,
	helperInjectables,
	appServices
];

import { App } from './components/app';



bootstrap(
	App,
	[universalInjectables]
	);

