/* global jasmine */
/* global __karma__ */
/* global System */

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

// Jasmine config
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// Cancel Karma's synchronous start, we will call `__karma__.start()` later, once all the specs are loaded
__karma__.loaded = function () {};

// System config
System.baseURL = '/base/';
System.defaultJSExtensions = true;
System.config({
	paths: {
		'*': 'build/*.js',
		'angular2/*': 'scripts/angular2/*'
	},
	
	meta: {
		'build/libs/rx.js': { format: 'cjs' },
	},
	map: {
		rx: 'libs/rx'
	}
});

// Import all the specs, execute their `main()` method and kick off Karma (Jasmine)
System
	.import('angular2/src/core/dom/browser_adapter')
	.then(function (browser_adapter) {
		browser_adapter.BrowserDomAdapter.makeCurrent();
	})
	.then(function () {
		return Promise.all(
			Object
				.keys(window.__karma__.files) // All files served by Karma
				.filter(specs)
				.map(function (path) {
					return System.import(path).then(function (module) {
						if (module.hasOwnProperty('main')) module.main();
						else throw new Error('Module ' + path + ' does not implement main() method.');
					});
				})
		);
	})
	.then(
		function () {
			__karma__.start();
		},
		function (error) {
			console.error(error.stack || error);
			__karma__.start();
		}
	);


function specs (path) {
	return /.spec\.js$/.test(path);
}