module.exports = function( grunt ) {

"use strict";

var banner = "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
	"<%= grunt.template.today('isoDate') %>\n" +
	"<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
	"* Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
	" Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n";

grunt.loadNpmTasks( "grunt-contrib-jshint" );
grunt.loadNpmTasks( "grunt-git-authors" );
grunt.loadNpmTasks( "grunt-contrib-uglify" );
grunt.loadNpmTasks( "grunt-contrib-concat" );
grunt.loadNpmTasks( "grunt-contrib-copy" );

grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
	concat: {
		oldIE: {
			options: {
				banner: banner,
				stripBanners: {
					block: true
				}
			},
			src: [ "src/old-ie.js", "src/pointer.js" ],
			dest: "dist/jquery.pointer.js"
		}
	},
	copy: {
		modern: {
			files: [{
				src: "src/pointer.js",
				dest: "dist/jquery.pointer.modern.js"
			}]
		}
	},
	uglify: {
		options: {
			preserveComments: false
		},
		oldIE: {
			options: {
				banner: banner
			},
			files: {
				"dist/jquery.pointer.min.js": "dist/jquery.pointer.js"
			}
		},
		modern: {
			options: {
				banner: banner
			},
			files: {
				"dist/jquery.pointer.modern.min.js": "dist/jquery.pointer.modern.js"
			}
		}
	},
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

grunt.registerTask( "default", [ "lint", "concat:oldIE", "uglify:oldIE" ] );
grunt.registerTask( "modern", [ "lint", "copy:modern", "uglify:modern" ] );
grunt.registerTask( "lint", [ "jshint" ] );

};
