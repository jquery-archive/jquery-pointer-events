module.exports = function( grunt ) {

"use strict";

grunt.loadNpmTasks( "grunt-contrib-jshint" );
grunt.loadNpmTasks( "grunt-git-authors" );

grunt.initConfig({
	jshint: {
		src: {
			options: {
				jshintrc: "src/.jshintrc"
			},
			files: {
				src: "src/*.js"
			}
		},
		grunt: {
			options: {
				jshintrc: ".jshintrc"
			},
			files: {
				src: [ "Gruntfile.js" ]
			}
		}
	}
});

grunt.registerTask( "default", [ "lint" ] );
grunt.registerTask( "lint", [ "jshint" ] );

};
