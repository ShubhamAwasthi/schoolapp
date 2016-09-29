(function(global){
	var map = {
		'app' : 'app',
		'@angular' : 'node_modules/@angular',
		'rxjs' : 'node_modules/rxjs'
	};
	var packages = {
		'app' : {main : 'main.js', defaultExtension :'js'},
		'rxjs' : {defaultExtension : 'js'}
	};

	var ngPackages = [
		'core',
		'common',
		'compiler',
		'platform-browser',
		'platform-browser-dynamic',
		'forms',
		'router'
	];

	function packIndex(pkg){
		packages['@angular/'+pkg] = {main : 'index.js', defaultExtension : 'js'};
	}

	function packUmdIndex(pkg){
		packages['@angular/'+pkg] = {main : 'bundles/'+pkg+'.umd.js', defaultExtension :'js'};
	}

	var packConfig = System.packageWithIndex ? packIndex : packUmdIndex ;

	ngPackages.forEach(packConfig);

	System.config({
		'map' : map,
		'packages' : packages
	});

})(this);