module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: ["build/release/*"]
			},
			qa: {
				src: ["build/report/*"]
			}
		},

		jshint: {
			files: ['./*.js', 'js/*']
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

	//Default task
	grunt.registerTask('default', ['clean:qa', 'jshint']);
	grunt.registerTask('qa', ['jshint']);
};
