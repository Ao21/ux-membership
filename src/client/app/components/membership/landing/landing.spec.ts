import {
describe,
it,
expect,
beforeEach
} from 'angular2/test_lib';

import {Router} from 'angular2/router';
import {MembershipState, Dispatcher} from '../../../services/services';
import {Landing} from './landing';
import {BaseException} from 'angular2/src/core/facade/lang';

export function main(): void {
	'use strict';
	
	describe('Landing', () => {
		let router: Router;
		let dispatcher: Dispatcher;
		let landing: Landing;
		let state: MembershipState;
		let min: number;
		let max: number;
		let index: number;

		beforeEach(() => {
			router = new Router();
			dispatcher = new Dispatcher();
			state = new MembershipState(dispatcher);
			landing = new Landing(state, router);
			min = 0;
			max = 3;
			index = 0;
		});
		
		// landing page should have a State
		describe('Landing Page', () => {
			it('should have a state', () => {
				expect(landing.state).toBeDefined();
			});
		});
		
		
		// landing page should have default values of Zero Adults, One Child
		
		// on Update Adult, the state should be updated with the correct value
		
		// on Update child, the state should be updated with the correct value
		
		// when Adult goes over 2 adults, disabled child should be true

	});
}