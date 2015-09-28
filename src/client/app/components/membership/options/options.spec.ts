import {
describe,
it,
expect,
beforeEach
} from 'angular2/test_lib';

import {ViewQuery, QueryList} from 'angular2/angular2';
import {MembershipState, Dispatcher} from '../../../services/services';
import {Options} from './options';
import {OptionsGrid} from './grid/options_grid';
import {BaseException} from 'angular2/src/core/facade/lang';

export function main(): void {
	'use strict';
	
	describe('Options', () => {
		let dispatcher: Dispatcher;
		let options: Options;
		let vq: QueryList<OptionsGrid>;
		let state: MembershipState;
		let min: number;
		let max: number;
		let index: number;

		beforeEach(() => {
			vq = new ViewQuery(OptionsGrid);
			dispatcher = new Dispatcher();
			state = new MembershipState(dispatcher);
			options = new Options(state, vq);
			min = 0;
			max = 3;
			index = 0;
		});
		
		// landing page should have a State
		describe('Options Page', () => {
			it('should have options defined', () => {
				expect(options.options).toBeDefined();
			});
		});
		
		// landing page should have default values of Zero Adults, One Child
		
		// on Update Adult, the state should be updated with the correct value
		
		// on Update child, the state should be updated with the correct value
		
		// when Adult goes over 2 adults, disabled child should be true

	});
}