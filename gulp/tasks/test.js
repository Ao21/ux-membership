var gulp      	= require('gulp'),
    paths 		= require('../paths'),
    config    	= require('../config'),
    glob      	= require('glob'),
	path 		= require('path'),
    stylish   	= require('gulp-tslint-stylish'),
	karma 		= require('karma'),
	karmaParseConfig = require('karma/lib/config').parseConfig,
	$         	= require('gulp-load-plugins')({lazy: true});


gulp.task('vet',function(){
  return gulp.src(paths.app.ts)
  	.pipe($.plumber())
    .pipe($.tslint())
    .pipe($.tslint.report(stylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
});


gulp.task('plato', function(done) {
    console.log('Analyzing source with Plato');
    console.log('Browse to /report/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});


/**
 * Start Plato inspector and visualizer
 * 
 */

function startPlatoVisualizer(done) {
    console.log('Running Plato');

    var files = glob.sync(config.plato.js);
    var excludeFiles = /.*\.spec\.js/;
    var plato = require('plato');

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = paths.test.report + '/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        if (done) { done(); }
    }
};

gulp.task('test-dev',['deps/angular2'], function(cb) {
	runKarma('karma.conf.js', {
		autoWatch: true,
		singleRun: false
	}, cb);
});

function runKarma(configFilePath, options, cb) {

	configFilePath = path.resolve(configFilePath);

	var server = karma.server;
	var log=$.util.log, colors=$.util.colors;
	var config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });
	
	

	server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		cb();
		process.exit(exitCode);
	});
}