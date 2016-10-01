(function(global){
	var map = {
		'app' : 'app',
		'@angular' : 'node_modules/@angular',
		'rxjs' : 'node_modules/rxjs',
		'angularfire2' : 'node_modules/angularfire2/bundles',
		'firebase'  : 'node_modules/firebase'
	};
	var packages = {
		'app' : {main : 'main.js', defaultExtension :'js'},
		'rxjs' : {defaultExtension : 'js'},
		'angularfire2' : { main : 'angularfire2.umd.js', defaultExtension : 'js' },
		'firebase' : { main : 'firebase.js' }
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