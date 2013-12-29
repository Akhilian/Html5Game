require.config({

	baseUrl: "js/",

	paths: {
		"jquery" : '../tools/jquery',
		"Stats" : '../tools/Stats'
	},

	packages: [
		{
			name: 'physicsjs',
			location: '../tools/physicsjs',
			main: 'physicsjs-0.5.3.min'	
		}
	],

	shim: {
		'Stats': {
			exports: 'Stats'
		}
	},

	deps: ["start"]
});