require.config({

	baseUrl: "js/",

	paths: {
		"jquery" : '../vendor/jquery',
		"Stats" : '../vendor/Stats'
	},

	packages: [
		{
			name: 'physicsjs',
			location: '../vendor/physicsjs',
			main: 'physicsjs-0.5.3.min'	
		}
	],

	shim: {
		'Stats': {
			exports: 'Stats'
		}
	},

	deps: ["Start"]
});