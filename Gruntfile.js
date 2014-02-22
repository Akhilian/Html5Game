module.exports = function(grunt) {
	'use strict';

	// Project configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: ["build/release/*"]
			},
			qa: {
				src: ["build/report/*", '_SpecRunner.html']
			}
		},

		jshint: {
			files: ['./*.js', 'js/*', 'test/*']
		},

		jasmine: {
			model:{
				src: 'js/model/List.js',
				options: {
					specs: 'test/model/LifeTest.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: 'bootstrap.js',
						requireConfig: {
							baseUrl: 'js'
						}
					}
				}
			}
		},

		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}

	});

	// Tasks list
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');


	//Default task
	grunt.registerTask('default', ['clean:qa', 'jshint']);
	grunt.registerTask('qa', ['jshint', 'jasmine:model', 'clean:qa']);
};
