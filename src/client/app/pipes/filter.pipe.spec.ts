import {
	describe,
	it,
	expect,
	beforeEach
} from 'angular2/test_lib';


import {BaseException} from 'angular2/src/core/facade/lang';
import { FilterPipe } from './filter_pipe';

export function main(): void {
	'use strict';
	describe('FilterPipe', () => {
		
		let pipe: FilterPipe;
		let arr: any;
		let filter: any;
		
		beforeEach(() => {
			pipe = new FilterPipe();
			arr = [{name: 'name', age: 12}, {name: 'andy', age: 14}];
			filter = [{age: 12}];
		});
		
		describe('transform', () => {
			it('should have an argument', () => {
				expect(function(): void {pipe.transform(null)
					.toThrow( new BaseException('filter pipe requires one argument'));
				});
			});
			it('should filter an array', () => {
				expect(pipe.transform(arr, filter)).toEqual([{name: 'name', age: 12}]);
			});
		});
	});
}